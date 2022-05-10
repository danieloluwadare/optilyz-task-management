import request from 'supertest';
import app from '../../../../../app';

describe('The User Route', () => {
  describe('POST /v1/users/signup', () => {
    it('should return a 201 on successful signup', async () => {
      return request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 'John doe' })
        .expect(201);
    });

    it('should return a 422 with an invalid email', async () => {
      const response = await request(app)
        .post('/v1/users/signup')
        .send({ email: 'teseeeeee', password: 'password', name: 'John doe' })
        .expect(422);

      expect(response.body.message).toEqual('email must be a valid email');
    });

    it('should return a 422 with an invalid password', async () => {
      const response = await request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'passw', name: 'John doe' })
        .expect(422);

      expect(response.body.message).toEqual('password must be at least 6 characters');
    });

    it('should return a 422 with an invalid name', async () => {
      await request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 2345 })
        .expect(422);
    });

    it('should disallow duplicate emails', async () => {
      await request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 'John Doe' })
        .expect(201);

      const response = await request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 'John Doe' })
        .expect(422);

      expect(response.body.message).toEqual('Email already used');
    });
  });
  describe('POST /v1/users/login', () => {
    it('should return a 200 on successful login', async () => {
      await request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 'John Doe' })
        .expect(201);

      return request(app)
        .post('/v1/users/login')
        .send({ email: 'test@example.com', password: 'password' })
        .expect(200);
    });

    it('should return a 422 for invalid email', async () => {
      await request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 'John Doe' })
        .expect(201);

      return request(app)
        .post('/v1/users/login')
        .send({ email: 'test', password: 'password' })
        .expect(422);
    });

    it('should return a 401 fwhen an incorrect password is supplied', async () => {
      await request(app)
        .post('/v1/users/signup')
        .send({ email: 'test@example.com', password: 'password', name: 'John Doe' })
        .expect(201);

      return request(app)
        .post('/v1/users/login')
        .send({ email: 'test@example.com', password: 'passwor' })
        .expect(401);
    });
  });
});
