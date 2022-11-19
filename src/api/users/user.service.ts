import {Injectable} from '@nestjs/common';
import {UserData, UserLoginBody} from './user.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as EmailValidator from 'email-validator';
import {sign} from 'jsonwebtoken';
import bcrypt, {genSalt, hash} from "bcrypt";

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

        // for security purpose, hash the password before document save
        const salt: string = await genSalt();
        console.log(salt);
        const hashedPassword = await hash(password, salt)

        const newUser = new this.userModel({...data, password: hashedPassword, createdAt: new Date()});
        const result = await newUser.save();
        console.log("POST: new user was created successfully");
        return result;
    }

    async loginUser(data: UserLoginBody) {
        const {eMail, password} = data;

        // find user by id
        const user = await this.userModel.findOne({eMail});
        if (user) {

        } else {
            throw new Error("Login failed, check password & e-mail")
        }
    }


    /**
     * create jwt token
     * @Param id - id needed to create token
     * */
    createJWTToken(id: string) {
        return sign({id}, 'jwt user token', {
            expiresIn: 3 * 24 * 60 * 60
        });
    }
}
