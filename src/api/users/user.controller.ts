import {Body, Controller, HttpException, HttpStatus, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {handleCreateUserError} from './utils';

// api controller for /users, available routes ->
// @post /register - create new account
// @post /login - login user

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // creating new user in mongoDB
    @Post('register')
    async createNew(@Res() res, @Body() body) {
        try {
            // create new user and set 'jwt' cookie
            const {username, _id} = await this.userService.createUser(body);
            const token = this.userService.createJWTToken(_id as unknown as string);
            res.cookie('jwt', token, {httpOnly: true});
            res.status(201).send({username, _id});
        } catch (e) {
            // handle errors
            throw new HttpException(
                handleCreateUserError(e.message),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    // logging user
    @Post('/login')
    async login(@Res() res, @Body() body) {
        try {
            const {eMail, password} = body;
            // check if e-mail and password are provided
            if (eMail && password) {
                // find user with email and check his password, also set 'jwt' cookie
                const {username, _id} = await this.userService.loginUser({eMail, password});
                const token = this.userService.createJWTToken(_id as unknown as string);
                res.cookie('jwt', token, {httpOnly: true});
                res.status(200).send({username, _id});
            } else {
                throw new Error("Missing login data")
            }
        } catch (e) {
            // handle error
            throw new HttpException(
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
