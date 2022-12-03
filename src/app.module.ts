import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './api/users/user.module';
import config from './config';
import {MongooseModule} from '@nestjs/mongoose';
import {config as ORM_CONFIG} from './orm.config'
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [MongooseModule.forRoot(config.MONGO), UserModule, TypeOrmModule.forRoot(ORM_CONFIG)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
