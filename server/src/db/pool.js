import pg from 'pg';
import { env } from '../config/env.js';

export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseUrl?.includes('localhost') ? false : { rejectUnauthorized: false },
  max: 10
});

export const query = (text, params) => pool.query(text, params);
