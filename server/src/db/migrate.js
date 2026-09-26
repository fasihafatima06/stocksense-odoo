import fs from 'node:fs/promises'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { pool } from './pool.js';
const root = path.dirname(fileURLToPath(import.meta.url));
try { const files = (await fs.readdir(path.join(root, 'migrations'))).sort(); for (const file of files) { console.log(`Running ${file}`); await pool.query(await fs.readFile(path.join(root, 'migrations', file), 'utf8')); } console.log('Migrations complete.'); } finally { await pool.end(); }
