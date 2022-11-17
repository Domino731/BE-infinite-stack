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

    @Get('/create')
    getHello(): string {
        // this.userService.createUser().then((r) => console.log(r));
        return 'SUCCESS';
    }
}
