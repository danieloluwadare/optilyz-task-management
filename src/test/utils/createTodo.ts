import request from 'supertest';
import app from '../../app';
import { Todo } from '../../components/v1/todos/models/todo';

export const createTodo = async (token: string, todoData: Todo) => {
  const { body } = await request(app)
    .post(`/v1/todos?access_token=Bearer ${token}`)
    .send(todoData)
    .expect(201);

  return body;
};
