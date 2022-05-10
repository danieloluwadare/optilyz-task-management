import { NextFunction as Next, Request, Response } from 'express';
import { User, UserDoc } from '../components/v1/users/models/user';
import Exception from '../helpers/exception';
import { getAccessToken, verifyAccessToken } from '../helpers/jwtHelper';

declare global {
  namespace Express {
    interface Request {
      user: UserDoc;
    }
  }
}

/**
 * Authenticate the user jwt.
 * Sets the authenticated user on request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */
export const isAuthenticated = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const token: string = getAccessToken(req);

    const userId: string = verifyAccessToken(token);

    const authUser = await User.findById(userId);

    if (!authUser) throw new Exception('User not authenticated.', 401);

    req.user = authUser;

    return next();
  } catch (error) {
    next(new Exception(error.message, 401));
  }
};
