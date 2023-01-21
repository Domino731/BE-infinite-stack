import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import APP_CONFIG from "./config";

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: APP_CONFIG.POSTGRES_PASSWORD,
    host: 'localhost',
    database: 'Infinite_stack',
    // creating new key in table automatically, for example if you have table called companies (id, name), you can easily add year key
    synchronize: true,
    entities: ['dist/**/*.entity{.js, .ts}']

}