import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../../helpers/catchAsyncError';
import { UserDoc } from '../models/user';
import { UserService } from '../services/user';

const UserController = {
  singup: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user: UserDoc = await UserService.createUser(req.body);

    const token: string = user.generateToken();

    return res.status(201).json({
      status: 'Successful',
      data: { token },
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const user: UserDoc = await UserService.validateUser(req.body);
    const token: string = user.generateToken();

    return res.status(200).json({
      status: 'Successful',
      data: { token },
    });
  }),
};

export default UserController;
