import request from 'supertest';
import app from '../../../../../app';
import { createTodo } from '../../../../../test/utils/createTodo';
import { getToken } from '../../../../../test/utils/getToken';

describe('The Todo Route', () => {
  let token: string;

  beforeEach(async () => {
    token = await getToken();
  });

  const todoData = {
    title: 'buld',
    description: 'A brief description',
    dueTime: '2000-12-12',
    reminderTime: '2000-12-12',
    isCompleted: false,
  };

  describe('POST /v1/todos', () => {
    it('should return a 201 on successful todo creation', async () => {
      const { status } = await createTodo(token, todoData);

      expect(status).toBe('Successful');
    });

    it('should return a 422', async () => {
      const response = await request(app)
        .post(`/v1/todos?access_token=Bearer ${token}`)
        .send({ ...todoData, title: '' })
        .expect(422);

      expect(response.body.status).toBe('Failed');
    });
  });

  describe('GET /v1/todos', () => {
    it('should return a 200 if get all todos was successful', async () => {
      const response = await request(app).get(`/v1/todos?access_token=Bearer ${token}`).expect(200);

      expect(response.body.status).toBe('Successful');
    });
  });

  describe('GET /v1/todos/:id', () => {
    it('should return a 200 if get single todo was successful', async () => {
      const { data } = await createTodo(token, todoData);

      const response = await request(app)
        .get(`/v1/todos/${data._id}?access_token=Bearer ${token}`)
        .expect(200);

      expect(response.body.status).toBe('Successful');
    });

    it('should return a 404 if todo was not found', async () => {
      const response = await request(app)
        .get(`/v1/todos/952934857209?access_token=Bearer ${token}`)
        .expect(404);

      expect(response.body.status).toBe('Failed');
      expect(response.body.message).toBe('No Todo found with that ID');
    });
  });
  describe('PATCH /v1/todos', () => {
    it('should return a 200 if Todo was successfully updated', async () => {
      const { data } = await createTodo(token, todoData);

      const response = await request(app)
        .patch(`/v1/todos/${data._id}?access_token=Bearer ${token}`)
        .send({ title: 'Title updated' })
        .expect(200);

      expect(response.body.data.title).toBe('Title updated');
    });

    it('should return a 404 if Todo was not found', async () => {
      const response = await request(app)
        .patch(`/v1/todos/lafalk934899?access_token=Bearer ${token}`)
        .send({ title: 'Title updated' })
        .expect(404);

      expect(response.body.status).toBe('Failed');
      expect(response.body.message).toBe('No Todo found with that ID');
    });
  });
  describe('DELETE /v1/todos', () => {
    it('should return a 204 if Todo was successfully deleted', async () => {
      const { data } = await createTodo(token, todoData);

      const response = await request(app)
        .delete(`/v1/todos/${data._id}?access_token=Bearer ${token}`)
        .expect(204);

      expect(response.body.status).not.toBeDefined();
      expect(response.body.data).not.toBeDefined();
    });

    it('should return a 404 if Todo was not found', async () => {
      const response = await request(app)
        .patch(`/v1/todos/lafalk934899?access_token=Bearer ${token}`)
        .expect(404);

      expect(response.body.status).toBe('Failed');
      expect(response.body.message).toBe('No Todo found with that ID');
    });
  });
});
