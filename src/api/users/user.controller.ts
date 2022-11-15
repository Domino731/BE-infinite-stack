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
import {handleCreateUserError} from "./utils";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    createNew() {
        return {
            test: '123123'
        }
    }
    @Get('/create')
    getHello(): string {
        // this.userService.createUser().then((r) => console.log(r));
        return "SUCCESS"
    }
}
