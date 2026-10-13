import express from 'express';
import { z } from 'zod';
import sharp from 'sharp';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { passwordHash, verifyPassword } from './auth.mjs';

export const allowed = (role, kind) => role === 'admin' || (role === 'editor' && ['posts','uploads'].includes(kind)) || (role === 'staff' && ['enquiries','consultations'].includes(kind));
export const fail = (status, message) => { throw Object.assign(new Error(message), {status}); };
export function audit(db, actor, action, kind, id, fields = []) {
  db.prepare('INSERT INTO activity(actor,action,kind,recordId,fields,createdAt) VALUES (?,?,?,?,?,?)').run(actor,action,kind,id,JSON.stringify(fields),new Date().toISOString());
}
export function transaction(db, work) { db.exec('BEGIN IMMEDIATE');try {const value=work();db.exec('COMMIT');return value;}catch(error){db.exec('ROLLBACK');throw error;} }
export function filterRecords(records, query) {
  const q=String(query.q||'').toLowerCase();
  return records.filter(r=>(!query.status||r.status===query.status)&&JSON.stringify(r).toLowerCase().includes(q)&&(!query.overdue||query.overdue!=='true'||(r.followUpAt&&Date.parse(r.followUpAt)<Date.now()&&r.status!=='closed')));
}
export function checkConflict(records, data, id) {
  if(data.status!=='scheduled')return;
  const start=Date.parse(data.scheduledAt),end=start+(data.durationMinutes||60)*60000;
  const overlap=records.some(r=>r.id!==id&&r.status==='scheduled'&&(!r.assignedTo||!data.assignedTo||r.assignedTo.toLowerCase()===data.assignedTo.toLowerCase())&&start<Date.parse(r.scheduledAt)+(r.durationMinutes||60)*60000&&end>Date.parse(r.scheduledAt));
  if(overlap)fail(409,'This time overlaps another consultation for the assigned staff member (or an unassigned appointment).');
}
export function installFeatures(app, db, {parse, all, limiter, uploadsDir}) {
  const adminOnly=(req,_res,next)=>{if(req.role!=='admin')fail(403,'Administrator access required');next();};
  const password=z.string().min(12).max(128);
  app.post('/api/admin/account/password',limiter(10,15),(req,res)=>{
    const data=parse(z.object({currentPassword:z.string().max(128),newPassword:password}),req.body);
    const account=db.prepare('SELECT password FROM admins WHERE email=?').get(req.admin);
    if(!verifyPassword(data.currentPassword,account.password))fail(400,'Current password is incorrect');
    if(data.newPassword===data.currentPassword)fail(400,'Choose a different password');
    transaction(db,()=>{db.prepare('UPDATE admins SET password=? WHERE email=?').run(passwordHash(data.newPassword),req.admin);db.prepare('DELETE FROM sessions WHERE email=?').run(req.admin);audit(db,req.admin,'password-changed','account',req.admin);});
    res.json({ok:true,signInRequired:true});
  });
  app.get('/api/admin/staff',adminOnly,(_req,res)=>res.json({items:db.prepare('SELECT email,role,active FROM admin_access ORDER BY email').all()}));
  app.post('/api/admin/staff',adminOnly,limiter(20,60),(req,res)=>{
    const data=parse(z.object({email:z.email().max(254).transform(v=>v.toLowerCase()),password,role:z.enum(['admin','editor','staff'])}),req.body);
    if(db.prepare('SELECT email FROM admins WHERE email=?').get(data.email))fail(409,'An account with this email already exists');
    transaction(db,()=>{db.prepare('INSERT INTO admins(email,password) VALUES (?,?)').run(data.email,passwordHash(data.password));db.prepare('INSERT INTO admin_access VALUES (?,?,1)').run(data.email,data.role);audit(db,req.admin,'created','staff',data.email,['role']);});
    res.status(201).json({email:data.email,role:data.role,active:1});
  });
  app.patch('/api/admin/staff/:email',adminOnly,(req,res)=>{
    const data=parse(z.object({role:z.enum(['admin','editor','staff']),active:z.boolean()}),req.body);
    const email=req.params.email.toLowerCase();
    transaction(db,()=>{
      const current=db.prepare('SELECT * FROM admin_access WHERE email=?').get(email);if(!current)fail(404,'Staff account not found');
      if(email===req.admin&&(data.role!=='admin'||!data.active))fail(400,'You cannot disable or demote your own account');
      if(current.role==='admin'&&current.active&&(!data.active||data.role!=='admin')&&db.prepare("SELECT count(*) AS n FROM admin_access WHERE role='admin' AND active=1").get().n<=1)fail(400,'At least one active administrator is required');
      db.prepare('UPDATE admin_access SET role=?,active=? WHERE email=?').run(data.role,Number(data.active),email);
      db.prepare('DELETE FROM sessions WHERE email=?').run(email);audit(db,req.admin,'access-updated','staff',email,['role','active']);
    });res.json({ok:true});
  });
  app.get('/api/admin/activity',adminOnly,(req,res)=>{
    const page=Math.max(1,Math.floor(Number(req.query.page)||1));
    res.json({items:db.prepare('SELECT * FROM activity ORDER BY id DESC LIMIT 25 OFFSET ?').all((page-1)*25),total:db.prepare('SELECT count(*) AS n FROM activity').get().n,page});
  });
  app.get('/api/admin/history/:kind/:id',(req,res)=>{
    if(!allowed(req.role,req.params.kind))fail(403,'Access denied');
    res.json({items:db.prepare('SELECT * FROM activity WHERE kind=? AND recordId=? ORDER BY id DESC LIMIT 100').all(req.params.kind,req.params.id)});
  });
  app.get('/api/admin/enquiries/export',(req,res)=>{
    if(!allowed(req.role,'enquiries'))fail(403,'Access denied');
    // Neutralise spreadsheet formulas, including values prefixed with whitespace/control characters.
    const cell=value=>{let v=String(value??'');if(/^[\s\u0000-\u001f]*[=+@-]/.test(v)||/^[\t\r\n]/.test(v))v="'"+v;return '"'+v.replaceAll('"','""')+'"';};
    const fields=['id','name','email','organisation','service','status','assignedTo','followUpAt','createdAt','message'];
    const rows=filterRecords(all('enquiries'),req.query);
    audit(db,req.admin,'exported','enquiries','',fields);
    res.set('Content-Disposition','attachment; filename="bba-enquiries.csv"').type('text/csv').send('\uFEFF'+[fields.map(cell).join(','),...rows.map(r=>fields.map(f=>cell(r[f])).join(','))].join('\r\n'));
  });
  app.get('/api/admin/consultations/calendar',(req,res)=>{
    if(!allowed(req.role,'consultations'))fail(403,'Access denied');
    const month=parse(z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),req.query.month);
    const start=Date.parse(month+'-01T00:00:00Z');const endDate=new Date(start);endDate.setUTCMonth(endDate.getUTCMonth()+1);
    if(!Number.isFinite(start))fail(400,'Invalid month');
    res.json({items:all('consultations').filter(r=>r.status==='scheduled'&&Date.parse(r.scheduledAt)<endDate.getTime()&&Date.parse(r.scheduledAt)+(r.durationMinutes||60)*60000>start).sort((a,b)=>Date.parse(a.scheduledAt)-Date.parse(b.scheduledAt))});
  });
  app.post('/api/admin/uploads',limiter(30,60),(req,_res,next)=>{if(!allowed(req.role,'uploads'))fail(403,'Blog editing access required');next();},express.raw({type:['image/jpeg','image/png','image/webp'],limit:'5mb',inflate:false}),async(req,res)=>{
    if(!Buffer.isBuffer(req.body)||!req.body.length)fail(400,'Choose a JPEG, PNG or WebP image (up to 5 MB).');
    let buffer;
    try {
      const image=sharp(req.body,{limitInputPixels:20000000,failOn:'warning'});
      const meta=await image.metadata();if(!['jpeg','png','webp'].includes(meta.format)||meta.pages>1)fail(400,'Unsupported image');
      buffer=await image.rotate().resize({width:2000,height:2000,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();
    } catch {fail(400,'Image could not be decoded. Use a non-animated JPEG, PNG or WebP under 20 megapixels.');}
    const name=randomUUID()+'.webp';await mkdir(uploadsDir,{recursive:true,mode:0o700});await writeFile(resolve(uploadsDir,name),buffer,{flag:'wx',mode:0o600});
    audit(db,req.admin,'uploaded','uploads',name);res.status(201).json({url:'/media/'+name});
  });
}
