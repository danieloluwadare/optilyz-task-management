import { NextFunction as Next, Request, Response } from 'express';
import Exception from '../../../../helpers/exception';
import { LoginSchema } from '../validation-schemas';

/**
 * Validates the login request
 *
 * @param {Object} req
 *
 * @param {Object} _res
 *
 * @param {Function} next
 *
 * @return {Object}
 */
export const loginValidator = async (req: Request, _res: Response, next: Next): Promise<void> => {
  const { email, password } = req.body;

  try {
    await LoginSchema.validate({
      email,
      password,
    });

    return next();
  } catch (error) {
    next(new Exception(error.message, 422));
  }
};
