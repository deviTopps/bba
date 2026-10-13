import { insightsPage } from '../../src/data/insights.ts';
import { openDb } from './db.mjs';
import { randomUUID } from 'node:crypto';
const db=openDb();
let added=0;
try {
  db.exec('BEGIN IMMEDIATE');
  for(const post of insightsPage.posts){
    if(db.prepare("SELECT id FROM records WHERE kind='posts' AND json_extract(data,'$.slug')=?").get(post.slug))continue;
    const data={...post,topic:post.topic.slug,status:'published'};
    db.prepare('INSERT INTO records VALUES (?,?,?,?)').run(randomUUID(),'posts',JSON.stringify(data),new Date().toISOString());
    added++;
  }
  db.exec('COMMIT');console.log(`Imported ${added} local posts. Existing slugs were left unchanged.`);
}catch(error){db.exec('ROLLBACK');throw error;}finally{db.close();}
