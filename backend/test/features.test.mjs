import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { openDb } from '../src/db.mjs';
import { createApp } from '../src/app.mjs';
import { passwordHash } from '../src/auth.mjs';

async function setup(t) {
  const uploadsDir=await mkdtemp(join(tmpdir(),'bba-upload-test-'));const db=openDb(':memory:');
  db.prepare('INSERT INTO admins VALUES (?,?)').run('admin@example.com',passwordHash('original-password-123'));
  const server=createApp(db,{uploadsDir}).listen(0,'127.0.0.1');await once(server,'listening');
  t.after(async()=>{server.closeAllConnections();await new Promise(done=>server.close(done));db.close();await rm(uploadsDir,{recursive:true,force:true});});
  const base='http://127.0.0.1:'+server.address().port;
  const call=(cookie,path,method='GET',body)=>fetch(base+'/api/'+path,{method,headers:{'Content-Type':'application/json','X-BBA-Admin':'1',Cookie:cookie},body:body?JSON.stringify(body):undefined});
  async function login(email='admin@example.com',password='original-password-123'){const response=await call('','admin/login','POST',{email,password});assert.equal(response.status,200);return response.headers.get('set-cookie').split(';')[0];}
  return {db,base,call,login};
}
const client={name:'Example client',email:'client@example.com',service:'Tax',message:'Please help with tax compliance.'};

test('staff permissions, deactivation, password changes and audit metadata',async t=>{
  const {db,call,login}=await setup(t);let owner=await login();
  for(const role of ['editor','staff'])assert.equal((await call(owner,'admin/staff','POST',{email:role+'@example.com',password:'unique-staff-password',role})).status,201);
  const editor=await login('editor@example.com','unique-staff-password'),staff=await login('staff@example.com','unique-staff-password');
  assert.equal((await call(editor,'admin/enquiries')).status,403);
  assert.equal((await call(editor,'admin/consultations/calendar?month=2026-10')).status,403);
  assert.equal((await call(staff,'admin/posts')).status,403);
  assert.equal((await call(staff,'admin/staff')).status,403);
  assert.equal((await call(staff,'admin/activity')).status,403);
  assert.equal((await call(staff,'admin/history/posts/anything')).status,403);
  assert.equal((await call(editor,'admin/enquiries/export')).status,403);
  assert.equal((await call(staff,'admin/uploads','POST',{})).status,403);
  assert.deepEqual(Object.keys(await (await call(editor,'admin/summary')).json()),['posts']);
  assert.equal((await call(owner,'admin/staff/admin%40example.com','PATCH',{role:'staff',active:true})).status,400);
  assert.equal((await call(owner,'admin/staff/editor%40example.com','PATCH',{role:'editor',active:false})).status,200);
  assert.equal((await call(editor,'admin/posts')).status,401);
  assert.equal((await call('','admin/login','POST',{email:'editor@example.com',password:'unique-staff-password'})).status,401);
  const secondOwner=await login();
  assert.equal((await call(owner,'admin/account/password','POST',{currentPassword:'wrong',newPassword:'replacement-password-123'})).status,400);
  assert.equal((await call(owner,'admin/account/password','POST',{currentPassword:'original-password-123',newPassword:'replacement-password-123'})).status,200);
  assert.equal((await call(owner,'admin/me')).status,401);assert.equal((await call(secondOwner,'admin/me')).status,401);
  assert.equal((await call('','admin/login','POST',{email:'admin@example.com',password:'original-password-123'})).status,401);
  owner=await login('admin@example.com','replacement-password-123');
  const audit=await (await call(owner,'admin/activity')).json();assert.ok(audit.items.some(r=>r.action==='password-changed'));
  const auditText=JSON.stringify(db.prepare('SELECT * FROM activity').all());assert.ok(!auditText.includes('replacement-password-123'));assert.ok(!auditText.includes('original-password-123'));
});

test('enquiry filters, follow-ups, safe CSV, appointment overlaps and history',async t=>{
  const {call,login}=await setup(t);const owner=await login();
  const response=await call('','public/enquiries','POST',{...client,name:'=SUM(1,2)',message:'A multiline\nmessage with "quotes".'});const id=(await response.json()).id;
  assert.equal((await call(owner,'admin/enquiries/'+id,'PATCH',{status:'reviewing',followUpAt:'2020-01-01T10:00:00Z'})).status,200);
  assert.equal((await (await call(owner,'admin/enquiries?overdue=true&status=reviewing')).json()).total,1);
  assert.equal((await (await call(owner,'admin/enquiries?status=closed')).json()).total,0);
  const csv=await (await call(owner,'admin/enquiries/export?status=reviewing')).text();assert.ok(csv.includes('"\'=SUM(1,2)"'));assert.ok(csv.includes('""quotes""'));
  await call(owner,'admin/enquiries/'+id,'PATCH',{status:'closed'});
  assert.equal((await (await call(owner,'admin/enquiries?overdue=true')).json()).total,0);
  const booking={...client,status:'scheduled',scheduledAt:'2026-10-06T10:00:00Z',durationMinutes:60,assignedTo:'consultant@example.com'};
  const first=await call(owner,'admin/consultations','POST',booking);assert.equal(first.status,201);const firstId=(await first.json()).id;
  assert.equal((await call(owner,'admin/consultations','POST',{...booking,scheduledAt:'2026-10-06T10:30:00Z'})).status,409);
  assert.equal((await call(owner,'admin/consultations','POST',{...booking,scheduledAt:'2026-10-06T11:00:00Z'})).status,201);
  assert.equal((await call(owner,'admin/consultations','POST',{...booking,assignedTo:'other@example.com'})).status,201);
  assert.equal((await call(owner,'admin/consultations','POST',{...booking,assignedTo:''})).status,409);
  assert.equal((await call(owner,'admin/consultations/'+firstId,'PATCH',{notes:'No timing change'})).status,200);
  const calendar=await (await call(owner,'admin/consultations/calendar?month=2026-10')).json();assert.equal(calendar.items.length,3);
  assert.equal((await call(owner,'admin/consultations/calendar?month=invalid')).status,400);
  const history=await (await call(owner,'admin/history/consultations/'+firstId)).json();assert.ok(history.items.some(r=>r.action==='updated'&&r.fields.includes('notes')));
});

test('image uploads are authenticated, decoded, re-encoded and compatible with posts',async t=>{
  const {call,login,base}=await setup(t);const owner=await login();
  const input=await sharp({create:{width:32,height:32,channels:3,background:'#c6922f'}}).png().toBuffer();
  const upload=(cookie,body,type='image/png')=>fetch(base+'/api/admin/uploads',{method:'POST',headers:{Cookie:cookie,'Content-Type':type,'X-BBA-Admin':'1'},body});
  assert.equal((await upload('',input)).status,401);
  assert.equal((await upload(owner,Buffer.from('not an image'))).status,400);
  assert.equal((await upload(owner,Buffer.from('<svg/>'),'image/svg+xml')).status,400);
  const result=await upload(owner,input);assert.equal(result.status,201);const image=(await result.json()).url;assert.match(image,/^\/media\/[a-f0-9-]+\.webp$/);
  const media=await fetch(base+image);assert.equal(media.status,200);assert.match(media.headers.get('content-type'),/image\/webp/);
  const meta=await sharp(Buffer.from(await media.arrayBuffer())).metadata();assert.equal(meta.format,'webp');assert.equal(meta.exif,undefined);
  const post={title:'Uploaded image test',slug:'uploaded-image-test',excerpt:'This is a test article with an uploaded image.',topic:'tax',image,paragraphs:['Body'],status:'draft',publishedAt:'2026-01-01T00:00:00Z'};
  assert.equal((await call(owner,'admin/posts','POST',post)).status,201);
  assert.equal((await call(owner,'admin/posts','POST',{...post,slug:'unsafe-image',image:'/stock/../../secret'})).status,400);
  assert.equal((await (await call('','public/posts')).json()).length,0);
});
