import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {sign} from 'jsonwebtoken';
import {compare, genSalt, hash} from "bcrypt";
import {UserData, UserLoginBody} from "./types";
import * as EmailValidator from 'email-validator';
import {LOGIN_ERRORS, REGISTER_ERRORS} from "./const";

@Injectable()
export class UserService {
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
            throw new Error(REGISTER_ERRORS.INVALID_EMAIL);
        }
        if (!/[0-9]/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
            throw new Error(REGISTER_ERRORS.INVALID_PASSWORD)
        }

        // for security purpose, hash the password before document save method
        const salt: string = await genSalt();
        const hashedPassword = await hash(password, salt)

        // create new user document and save in db
        const newUser = new this.userModel({...data, password: hashedPassword, createdAt: new Date()});
        const result = await newUser.save();
        return result;
    }

    /**
     * login the user
     * @Param data - data needed to log
     * */
    async loginUser(data: UserLoginBody) {
        const {eMail, password} = data;
        const error: string = LOGIN_ERRORS.LOGIN_ERROR;

        // find user by id in users collection
        const user = await this.userModel.findOne({eMail});
        if (user) {
            const auth: boolean = await compare(password, user.password);
            if (auth) {
                return user;
            } else {
                throw new Error(error);
            }
        } else {
            throw new Error(error);
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
