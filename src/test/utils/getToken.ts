import request from 'supertest';
import app from '../../app';

export const getToken = async () => {
  const { body } = await request(app)
    .post('/v1/users/signup')
    .send({ email: 'test@example.com', password: 'password', name: 'John Doe' })
    .expect(201);

  return body.data.token;
};
