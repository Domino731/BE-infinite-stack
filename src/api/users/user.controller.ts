import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {loginErrorMessage, registerErrorMessage} from './utils';
import {JWT_COOKIE_NAME, LOGIN_ERRORS} from "./const";


// api controller for /users, available routes ->
// @post /register - create new account
// @post /login - login user

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // creating new user in mongoDB
    @Post('/register')
    async createNew(@Res() res, @Body() body) {
        try {
            // create new user and set 'jwt' cookie
            const {username, _id} = await this.userService.createUser(body);
            const token = this.userService.createJWTToken(_id as unknown as string);

            res.cookie(JWT_COOKIE_NAME, token, {httpOnly: true});
            res.status(201).send({username, _id});
        } catch (e) {
            console.log('error', e)
            // handle errors
            throw new HttpException(
                registerErrorMessage(e.message),
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

                res.cookie(JWT_COOKIE_NAME, token, {httpOnly: true});
                res.status(200).send({username, _id});
            } else {
                throw new Error(LOGIN_ERRORS.MISSING_DATA);
            }
        } catch (e) {
            // handle error
            throw new HttpException(
                loginErrorMessage(e.message),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    // get user data by uid
    @Get('/:uid')
    async getUser(@Param('uid') uid, @Res() res) {
        try {
            const user = await this.userService.findUserByUid(Number(uid));
            res.status(200).send({user});
        } catch (e) {
            console.log('error');
            console.log('/user/:uid');
            console.log(e.message)
            throw new HttpException('ERROR', HttpStatus.NOT_FOUND)
        }
    }
}
