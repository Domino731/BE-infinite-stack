import { Injectable } from '@nestjs/common';
import { UserData } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private users: UserData[];

  constructor(
    @InjectModel('user') private readonly userModel: Model<UserData>,
  ) {}

  // adding new user
  async createUser(data: UserData) {
    const newUser = new this.userModel({ ...data, createdAt: new Date() });
    const result = await newUser.save();
    return result;
  }

  getSample(): string {
    return 'Hello World!';
  }
}
