import { ApiError } from '../utils/api-error.js';
export const validate = (schema) => (req, _res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return next(new ApiError(422, parsed.error.issues[0].message, 'VALIDATION_ERROR'));
  req.body = parsed.data; next();
};
