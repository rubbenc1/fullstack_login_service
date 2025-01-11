import * as dotenv from 'dotenv';
import {join, resolve} from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });

const knexconfig = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
        directory: join(__dirname, '../database/migrations'),
    },
    seeds: {
        directory: join(__dirname, '../database/seeds'),
    },
};

export default knexconfig;