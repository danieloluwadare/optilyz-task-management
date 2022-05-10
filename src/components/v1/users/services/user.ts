import Exception from '../../../../helpers/exception';
import { User, UserDoc } from '../models/user';

type loginData = {
  email: string;
  password: string;
};

export class UserService {
  static async createUser(data: UserDoc) {
    const { name, email, password } = data;

    return User.create({
      email,
      name,
      password,
    });
  }

  static async validateUser(data: loginData) {
    const { email, password } = data;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePasswords(password))) {
      throw new Exception('Invalid user credential', 401);
    }

    return user;
  }
}
