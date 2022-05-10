import { Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import Exception from './exception';

export const getAccessToken = (req: Request) => {
  const accessToken: string =
    req.headers.authorization || req.body.access_token || req.query.access_token;

  if (!accessToken && !accessToken.startsWith('Bearer')) {
    throw new Exception('No token supplied', 401);
  }

  return accessToken.split(' ')[1];
};

export const verifyAccessToken = (token: string) => {
  const { id }: { id: string } = jwt.verify(token, config.jwtSecret) as { id: string };
  return id;
};
