import {Injectable} from '@nestjs/common';
import {UserData} from './user.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as EmailValidator from 'email-validator';

@Injectable()
export class UserService {
    private users: UserData[];

    constructor(
        @InjectModel('user') private readonly userModel: Model<UserData>,
    ) {
    }

    /** create new user in users collection
     * @Param data - object with new user data
     * */
    async createUser(data: UserData) {
        const {eMail, password} = data;

        // validate e-mail and password
        if (!EmailValidator.validate(eMail)) {
            throw new Error('Invalid e-mail address');
        }
        if (!/[0-9]/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
            throw new Error('Invalid password')
        }
        const newUser = new this.userModel({...data, createdAt: new Date()});
        const result = await newUser.save();
        console.log("POST: new user was created successfully");
        return result;
    }
}
