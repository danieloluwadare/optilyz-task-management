import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import config from '../../../../config';

// An interface that describes the properties that a User Document has
export interface UserDoc {
  _id: string;
  name: string;
  email: string;
  password: string;
  comparePasswords(password: string): boolean;
  generateToken(): string;
}

const UserSchema = new Schema<UserDoc>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Hash and save the user's password before saving to the database
 *
 * @return {null}
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await Bcrypt.hash(this.password, 12);

  return next();
});

/**
 * Compare password with user's hashed password on file.
 *
 * @return {boolean}
 */
UserSchema.methods.comparePasswords = async function (password: string) {
  return Bcrypt.compareSync(password, this.password);
};

/**
 * Generate a jwt for this user.
 *
 * @return {string}
 */
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, config.jwtSecret);
};

export const User = model<UserDoc>('User', UserSchema);
