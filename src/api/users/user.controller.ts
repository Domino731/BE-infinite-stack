import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import {UserService} from './user.service';
import {handleCreateUserError} from './utils';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async createNew(@Body() body) {
        try {
            const {username, _id} = await this.userService.createUser(body);
            return {username, _id};
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
