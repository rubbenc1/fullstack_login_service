import { Configuration } from "./type";


export default (): Configuration => ({
    port: +process.env.PORT,
    postgres: {
        port: +process.env.DB_PORT,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
})