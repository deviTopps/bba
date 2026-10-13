import { createInterface } from 'node:readline/promises';
import { openDb } from './db.mjs';
import { passwordHash } from './auth.mjs';
const prompt = createInterface({ input: process.stdin, output: process.stdout });
try {
  const email = (await prompt.question('Admin email: ')).trim().toLowerCase();
  console.log('Password input is visible in this local terminal. Use a unique password.');
  const password = await prompt.question('Password (at least 12 characters): ');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || password.length > 128) throw new Error('Invalid email or password length.');
  const db = openDb();
  if (db.prepare('SELECT email FROM admins WHERE email=?').get(email)) throw new Error('This administrator already exists.');
  db.prepare('INSERT INTO admins VALUES (?,?)').run(email, passwordHash(password));
  db.prepare("INSERT INTO admin_access VALUES (?,'admin',1)").run(email);
  db.close();
  console.log('Administrator created. Sign in at http://localhost:4000.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { prompt.close(); }
