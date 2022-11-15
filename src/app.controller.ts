import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('TEST')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
