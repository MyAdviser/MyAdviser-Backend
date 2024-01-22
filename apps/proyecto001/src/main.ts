import 'reflect-metadata'
import { Logger, ValidationPipe  } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import moduleAlias from 'module-alias';
import cors from 'cors';

async function bootstrap() {

  moduleAlias.addAlias('@src', __dirname)
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  app.use(cors({
    origin: process.env.DIRECTION_WEB,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  // connectdb
  await app.get(AppModule).startServer();

  //start server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
