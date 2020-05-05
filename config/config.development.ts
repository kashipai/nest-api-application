import { Dialect } from 'sequelize/types';
import { SequelizeOptions } from 'sequelize-typescript'

export interface Config
{
    database: SequelizeOptions,
    jwtPrivateKey: string
}

export const config: Config = {
    database: {
        dialect: 'mysql' as Dialect,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'my-secret-pw',
        database: 'test',
        logging: false,
        pool: {
            max: 10,
            min: 5,
            idle: 10000
        }

    },
    jwtPrivateKey: 'jwtPrivateKey',
};