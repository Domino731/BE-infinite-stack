import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';

// TODO: fix that, import not working
const cors = require("cors");

// function that is fires nest app
async function bootstrap() {
    // nest app instance with express
    const app = await NestFactory.create(AppModule);

    // app config
    app.use(cookieParser());
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));

    // start
    await app.listen(8000);
}

bootstrap();
