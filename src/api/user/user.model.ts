import * as moongose from 'mongoose';
import { IsString } from 'class-validator';

export const UserSchema = new moongose.Schema({
  eMail: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  // password validation is in ./service.ts
  password: {
    type: String,
    required: [true, 'Password is required'],
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
  @IsString() eMail: string;
  @IsString() password: string;
}
