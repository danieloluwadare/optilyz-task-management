import { NextFunction as Next, Request, Response } from 'express';
import Exception from '../../../../helpers/exception';
import TodoSchema from '../validation-schemas';

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
export const todoValidator = async (req: Request, _res: Response, next: Next): Promise<void> => {
  const { title, description, dueTime, reminderTime, isCompleted } = req.body;

  try {
    await TodoSchema.validate({
      title,
      description,
      dueTime,
      reminderTime,
      isCompleted,
    });

    return next();
  } catch (error) {
    next(new Exception(error.message, 422));
  }
};
