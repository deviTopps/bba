import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { randomUUID, randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { passwordHash, verifyPassword, tokenHash } from './auth.mjs';
import { allowed, audit, transaction, fail, filterRecords, checkConflict, installFeatures } from './features.mjs';
import { servicePages } from '../../src/data/services-catalog.ts';

const text = max => z.string().trim().max(max);
const intake = z.object({
  name: text(200).min(2), email: z.email().max(254), organisation: text(500).default(''),
  service: text(500).min(1), message: text(20000).min(8), company_website: text(500).optional(),
  subservices: z.array(text(500)).max(30).default([]),
  questionnaire: z.array(z.object({ id: text(30), question: text(1000), answer: text(5000) })).max(60).default([]),
});
const date = z.iso.datetime({ offset: true });
const workflow = z.object({ status: z.enum(['new','reviewing','awaiting-client','closed']), assignedTo: z.union([z.email(), z.literal('')]).default(''), notes: text(20000).default(''), followUpAt: z.union([date,z.literal('')]).default('') });
const consultation = intake.extend({ status: z.enum(['requested','scheduled','completed','cancelled']), scheduledAt: z.union([date,z.literal('')]).default(''), durationMinutes:z.number().int().min(15).max(480).default(60), assignedTo: z.union([z.email(),z.literal('')]).default(''), notes: text(20000).default('') }).superRefine((v, ctx) => { if(v.status==='scheduled' && !v.scheduledAt)ctx.addIssue({code:'custom',message:'A scheduled consultation needs a date',path:['scheduledAt']}); });
const post = z.object({ title: text(200).min(3), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180), excerpt: text(500).min(10), topic: z.enum(['audit','tax','advisory','public-sector','technology','data','sustainability']), image: z.string().regex(/^(?:\/stock\/[a-zA-Z0-9_-]+\.(?:jpe?g|png|webp)|\/media\/[a-f0-9-]{36}\.webp)$/).default('/stock/about-hero.jpg'), imageAlt: text(300).default(''), paragraphs: z.array(text(20000).min(1)).min(1).max(100), status: z.enum(['draft','published']), publishedAt: date });
const parse = (schema, value) => { const result = schema.safeParse(value); if(!result.success)throw Object.assign(new Error('Please check the submitted fields.'),{status:400,details:result.error.flatten()}); return result.data; };

export function createApp(db, { production = process.env.NODE_ENV === 'production', uploadsDir = resolve(dirname(process.env.DATABASE_PATH || './data/bba.sqlite'),'uploads') } = {}) {
  // Migrate existing operator-created accounts without changing passwords or records.
  db.exec("INSERT OR IGNORE INTO admin_access(email,role,active) SELECT email,'admin',1 FROM admins");
  const app = express();
  app.disable('x-powered-by');
  if(process.env.TRUST_PROXY === '1')app.set('trust proxy',1);
  app.use(helmet({ strictTransportSecurity: production ? undefined : false, contentSecurityPolicy: { directives: { 'upgrade-insecure-requests': production ? [] : null } } }));
  app.use(express.json({limit:'512kb'}));
  app.use('/api', (_req,res,next)=>{res.set('Cache-Control','no-store');next();});
  const limiter = (limit, minutes) => rateLimit({windowMs:minutes*60000,limit,standardHeaders:'draft-8',legacyHeaders:false});
  const read = row => row ? { ...JSON.parse(row.data), id:row.id, updatedAt:row.updated } : null;
  const all = kind => db.prepare('SELECT * FROM records WHERE kind=? ORDER BY updated DESC').all(kind).map(read);
  const get = (kind,id) => read(db.prepare('SELECT * FROM records WHERE kind=? AND id=?').get(kind,id));
  const save = (kind,id,data) => { const now=new Date().toISOString(); db.prepare('INSERT INTO records VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated=excluded.updated').run(id,kind,JSON.stringify(data),now);return get(kind,id); };
  const missing = () => { throw Object.assign(new Error('Record not found'),{status:404}); };
  const cookieToken = req => req.headers.cookie?.split(';').map(s=>s.trim()).find(s=>s.startsWith('bba_session='))?.slice(12) || '';
  const cookieOptions = {httpOnly:true,sameSite:'strict',secure:production,path:'/api/admin',maxAge:8*3600000};
  // An explicit non-simple header prevents cross-site form submissions; no CORS is enabled for admin APIs.
  app.use('/api/admin', (req,res,next)=>{ if(!['GET','HEAD'].includes(req.method) && req.get('X-BBA-Admin')!=='1')return res.status(403).json({error:'Invalid request origin'});next(); });
  const dummyHash=passwordHash(randomBytes(32).toString('hex'));
  app.post('/api/admin/login',limiter(10,15),(req,res)=>{
    const {email,password}=parse(z.object({email:z.email(),password:z.string().min(1).max(128)}),req.body);
    const admin=db.prepare('SELECT * FROM admins WHERE email=?').get(email.toLowerCase());
    const valid=verifyPassword(password,admin?.password||dummyHash);
    const access=admin&&db.prepare('SELECT role,active FROM admin_access WHERE email=?').get(admin.email);
    if(!valid||!admin||!access?.active)return res.status(401).json({error:'Invalid email or password'});
    const token=randomBytes(32).toString('hex');
    db.prepare('DELETE FROM sessions WHERE expires < ? OR token=?').run(Date.now(),tokenHash(cookieToken(req)));
    db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(tokenHash(token),admin.email,Date.now()+8*3600000);
    audit(db,admin.email,'signed-in','account',admin.email);
    res.cookie('bba_session',token,cookieOptions).json({email:admin.email,role:access.role});
  });
  app.use('/api/admin',(req,res,next)=>{const session=db.prepare('SELECT sessions.email,admin_access.role FROM sessions JOIN admin_access ON sessions.email=admin_access.email WHERE token=? AND expires>? AND active=1').get(tokenHash(cookieToken(req)),Date.now());if(!session)return res.status(401).json({error:'Sign in required'});req.admin=session.email;req.role=session.role;next();});
  app.get('/api/admin/me',(req,res)=>res.json({email:req.admin,role:req.role}));
  app.get('/api/admin/services',(_req,res)=>res.json({items:servicePages.map(({slug,title,spec})=>({slug,title,subservices:spec?.find(row=>row.label==='Core Services')?.items?.map(item=>item.label)||[]}))}));
  app.post('/api/admin/logout',(req,res)=>{db.prepare('DELETE FROM sessions WHERE token=?').run(tokenHash(cookieToken(req)));res.clearCookie('bba_session',{...cookieOptions,maxAge:undefined}).json({ok:true});});
  app.get('/api/admin/summary',(req,res)=>res.json(Object.fromEntries(['enquiries','posts','consultations'].filter(kind=>allowed(req.role,kind)).map(kind=>[kind,all(kind).length]))));
  installFeatures(app,db,{parse,all,limiter,uploadsDir});
  for(const kind of ['enquiries','posts','consultations']) {
    app.use('/api/admin/'+kind,(req,_res,next)=>{if(!allowed(req.role,kind))fail(403,'Access denied');next();});
    app.get('/api/admin/'+kind,(req,res)=>{const page=Math.max(1,Math.floor(Number(req.query.page)||1));const items=filterRecords(all(kind),req.query);res.json({items:items.slice((page-1)*25,page*25),total:items.length,page});});
    app.get('/api/admin/'+kind+'/:id',(req,res)=>res.json(get(kind,req.params.id)||missing()));
    app.patch('/api/admin/'+kind+'/:id',(req,res)=>res.json(transaction(db,()=>{const current=get(kind,req.params.id)||missing();const schema=kind==='posts'?post:kind==='consultations'?consultation:workflow;const data=parse(schema,{...current,...req.body});if(kind==='consultations')checkConflict(all(kind),data,current.id);const record=save(kind,current.id,{...current,...data});audit(db,req.admin,'updated',kind,current.id,Object.keys(data).filter(key=>JSON.stringify(data[key])!==JSON.stringify(current[key])));return record;})));
    // Archive via workflow statuses; destructive deletion is limited to blog posts.
    if(kind==='posts')app.delete('/api/admin/posts/:id',(req,res)=>{transaction(db,()=>{get(kind,req.params.id)||missing();db.prepare('DELETE FROM records WHERE id=? AND kind=?').run(req.params.id,kind);audit(db,req.admin,'deleted',kind,req.params.id);});res.json({ok:true});});
  }
  for(const [kind,schema] of [['posts',post],['consultations',consultation]])app.post('/api/admin/'+kind,(req,res)=>res.status(201).json(transaction(db,()=>{const data=parse(schema,req.body);if(kind==='consultations')checkConflict(all(kind),data);const id=randomUUID();const record=save(kind,id,data);audit(db,req.admin,'created',kind,id);return record;})));
  const submissionLimiter=limiter(20,60);
  for(const kind of ['enquiries','consultations'])app.post('/api/public/'+kind,submissionLimiter,(req,res)=>{
    if(req.body?.company_website)return res.status(202).json({ok:true});
    const data=parse(intake,req.body);delete data.company_website;
    const id=randomUUID();transaction(db,()=>{save(kind,id,{...data,status:kind==='enquiries'?'new':'requested',notes:'',assignedTo:'',createdAt:new Date().toISOString()});audit(db,'website','submitted',kind,id);});res.status(201).json({ok:true,id});
  });
  app.get('/api/public/posts',(_req,res)=>res.json(all('posts').filter(p=>p.status==='published'&&Date.parse(p.publishedAt)<=Date.now())));
  app.get('/health',(_req,res)=>res.json({ok:true}));
  app.use('/media',express.static(uploadsDir,{dotfiles:'deny',index:false,immutable:true,maxAge:'1y'}));
  app.use('/stock',express.static(fileURLToPath(new URL('../../public/stock',import.meta.url)),{dotfiles:'deny',index:false}));
  app.use(express.static(fileURLToPath(new URL('../public',import.meta.url))));
  app.use((_req,res)=>res.status(404).json({error:'Not found'}));
  app.use((error,_req,res,_next)=>{const duplicate=String(error.message).includes('UNIQUE constraint');const status=duplicate?409:error.status||500;if(status>=500)console.error('Admin service error:',error.code||error.name);res.status(status).json({error:duplicate?'This slug is already in use.':status>=500?'Service unavailable':error.message,details:error.details});});
  return app;
}
