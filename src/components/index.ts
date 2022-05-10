import { Router } from 'express';
import { todosRouter } from './v1/todos/routes';
import { usersRouter } from './v1/users/routes';

export const v1router = Router();

v1router.use(usersRouter);
v1router.use(todosRouter);
