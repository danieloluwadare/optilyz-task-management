import { Router } from 'express';
import UserController from '../controller';
import { loginValidator, signupValidator } from '../validators';

export const usersRouter = Router();

usersRouter.post('/users/signup', signupValidator, UserController.singup);
usersRouter.post('/users/login', loginValidator, UserController.login);
