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
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/create')
  getHello(): string {
    // this.userService.createUser().then((r) => console.log(r));
    return '123';
  }
}
