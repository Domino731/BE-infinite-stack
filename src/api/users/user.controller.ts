import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post, Req,
    Res,
} from '@nestjs/common';
import {UserService} from './user.service';
import {handleCreateUserError} from './utils';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // TODO before next version: add route
    @Post()
    async createNew(@Res() res, @Body() body) {
        try {
            const {username, _id} = await this.userService.createUser(body);
            const token = this.userService.createJWTToken(_id as unknown as string);
            res.cookie('jwt', token, {httpOnly: true})
            res.status(201).send({username, _id})
        } catch (e) {
            throw new HttpException(
                handleCreateUserError(e.message),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post('/login')
    async login(@Res() res, @Body() body) {
        try {
            const {eMail, password} = body;
            if (eMail && password) {
                const {username, _id} = await this.userService.loginUser({eMail, password});
                const token = this.userService.createJWTToken(_id as unknown as string);
                res.cookie('jwt', token, {httpOnly: true})
                res.status(200).send({username, _id})
            } else {
                throw new Error("Missing login data")
            }
        } catch (e) {
            console.log("/login - failed");
            console.log("message:", e.message);

            throw new HttpException(
                e.message,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('/create')
    getHello(): string {
        // this.userService.createUser().then((r) => console.log(r));
        return 'SUCCESS';
    }
}
