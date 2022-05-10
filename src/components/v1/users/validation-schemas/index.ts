import { object, SchemaOf, string } from 'yup';

type Login = {
  email: string;
  password: string;
};

type signup = {
  name: string;
  email: string;
  password: string;
};

export const LoginSchema: SchemaOf<Login> = object().shape({
  email: string().email().required(),
  password: string().min(6).max(10).required(),
});

export const SignupSchema: SchemaOf<signup> = object().shape({
  name: string().required().strict(),
  email: string().required().email(),
  password: string().min(6).max(10).required(),
});
