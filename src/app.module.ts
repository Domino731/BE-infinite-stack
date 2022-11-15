import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/users/user.module';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(config.MONGO), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
