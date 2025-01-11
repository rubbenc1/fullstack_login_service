import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import * as Joi from 'joi'
import { LoggerModule } from 'nestjs-pino';
import { UsersModule } from './users/users.module';
import { CaptchasModule } from './captchas/captchas.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        DB_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorized: true,
          },
        },
      },
    }),
    UsersModule,
    CaptchasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
