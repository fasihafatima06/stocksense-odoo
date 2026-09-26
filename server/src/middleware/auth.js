import admin from 'firebase-admin';
import { env } from '../config/env.js';
import { query } from '../db/pool.js';
import { ApiError } from '../utils/api-error.js';

if (env.firebase.projectId && env.firebase.clientEmail && env.firebase.privateKey && !admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(env.firebase) });
}

export async function requireAuth(req, _res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new ApiError(401, 'Authentication is required', 'UNAUTHENTICATED');
    if (!admin.apps.length) {
      if (process.env.NODE_ENV !== 'development') throw new ApiError(503, 'Authentication is not configured', 'AUTH_UNAVAILABLE');
      req.user = { uid: 'dev-user', email: 'manager@stocksense.dev', name: 'Alex Morgan', role: 'ADMIN' };
      return next();
    }
    const decoded = await admin.auth().verifyIdToken(token);
    const result = await query(`SELECT u.id, u.firebase_uid AS "uid", u.email, u.name, r.code AS role
      FROM users u JOIN user_roles ur ON ur.user_id = u.id JOIN roles r ON r.id = ur.role_id WHERE u.firebase_uid=$1`, [decoded.uid]);
    if (!result.rowCount) throw new ApiError(403, 'Your account is not provisioned', 'NOT_PROVISIONED');
    req.user = result.rows[0]; next();
  } catch (error) { next(error instanceof ApiError ? error : new ApiError(401, 'Invalid or expired session', 'UNAUTHENTICATED')); }
}

export const authorize = (...roles) => (req, _res, next) => roles.includes(req.user.role) ? next() : next(new ApiError(403, 'You do not have permission for this action', 'FORBIDDEN'));
