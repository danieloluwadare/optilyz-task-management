import { Router } from 'express';
import { isAuthenticated } from '../../../../middleware/auth';
import TodoController from '../controller/todo';
import { todoValidator } from '../validators/todo';

export const todosRouter = Router();

todosRouter
  .route('/todos')
  .get(isAuthenticated, TodoController.getAllTodos)
  .post(isAuthenticated, todoValidator, TodoController.createTodo);

todosRouter
  .route('/todos/:id')
  .get(isAuthenticated, TodoController.getSingleTodo)
  .patch(isAuthenticated, TodoController.updateTodo)
  .delete(isAuthenticated, TodoController.deleteTodo);
