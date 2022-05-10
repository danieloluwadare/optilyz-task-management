import { NextFunction as Next, Request, Response } from 'express';
import * as Yup from 'yup';
import Exception from '../../../../helpers/exception';
import { User } from '../models/user';
import { SignupSchema } from '../validation-schemas';

/**
 * Validates the registration request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 * @return {Object}
 */
export const signupValidator = async (req: Request, res: Response, next: Next): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    await SignupSchema.validate({
      name,
      email,
      password,
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Yup.ValidationError('Email already used');
    }

    return next();
  } catch (error) {
    next(new Exception(error.message, 422));
  }
};
