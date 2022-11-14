import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [MongooseModule.forRoot(config.MONGO), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
