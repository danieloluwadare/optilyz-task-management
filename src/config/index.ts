import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || 'development',
  opt: process.env.OPT || './opt/logs',

  database: {
    url: process.env.DATABASE_URL,
    testUrl: process.env.TEST_DATABASE_URL,
    host: process.env.DATABASE_HOST || 'host.docker.internal',
  },

  jwtSecret: process.env.JWT_SECRET || '1234',
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'test',
};
