import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { handleCreateUserError, validateCreateUserDate } from './utils';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createNew(@Body() body) {
    try {
      const res = await this.userService.createUser(body);
      return res;
    } catch (e) {
      console.log(e.message);
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
