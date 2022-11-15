import * as moongose from 'mongoose';

export const UserSchema = new moongose.Schema({
  eMail: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    maxlength: [10, 'Username is too long'],
    minLength: [3, 'Username is too short'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password is too short'],
  },
  createdAt: {
    type: Date,
    required: [true, 'CreatedAt key is required'],
    unique: true,
  },
});

export interface UserData {
  eMail: string;
  password: string;
  username: string;
}

export class User {
  eMail: string;
  password: string;
}
