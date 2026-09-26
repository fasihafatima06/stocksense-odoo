import { ApiError } from '../utils/api-error.js';

export function notFound(_req, _res, next) { next(new ApiError(404, 'Resource not found', 'NOT_FOUND')); }
export function errorHandler(error, _req, res, _next) {
  const status = error instanceof ApiError ? error.status : 500;
  if (status === 500) console.error(error);
  res.status(status).json({ success: false, message: status === 500 ? 'Something went wrong' : error.message, code: error.code || 'INTERNAL_ERROR' });
}
