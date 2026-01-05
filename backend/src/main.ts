import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as path from 'path';
// import { getEnv } from "PARENT_DIR/_shared/env";
const server = express();

// const kommoApiToken = getEnv()['KOMMO_API_TOKEN'];
// const env = getEnv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  server.use('/public', express.static(path.join(__dirname, '..', 'public')));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const port = process.env.PORT || 8080;

  // console.log("CHECK ENV VAlUES: ", env);

  server.listen(port, () => {
    console.log(`Application is running on port ${port}`);
  });
  
  await app.init();
}

bootstrap();

export const nestApp = server;
