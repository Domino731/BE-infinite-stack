import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';

var cors = require('cors');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    app.use(cookieParser());
    app.enableCors({
        allowedHeaders: "*",
        origin: "*"
    });
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Credentials", true);
        next();
    })
    await app.listen(8000);
}

bootstrap();
