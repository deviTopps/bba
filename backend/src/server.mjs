import { createApp } from './app.mjs';
import { openDb } from './db.mjs';
const db=openDb();
const port=Number(process.env.PORT||4000);
const server=createApp(db).listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`BBA admin service: http://localhost:${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>{db.close();process.exit(0);}));
