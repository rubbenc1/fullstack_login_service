import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

    // Enable CORS globally
  app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  initializeSwagger(app);
  initializeApp(app);
}

const initializeSwagger = (app: INestApplication): void => {
  const configSwagger = new DocumentBuilder()
    .setTitle('Authentication with Captcha')
    .setDescription('REST API Documentation')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document)
}
const initializeApp = async (app: INestApplication): Promise<void> =>{
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))
  await app.listen(port, () => {
    console.log(`Server has started on PORT ${port}`)
  })
}
bootstrap();
