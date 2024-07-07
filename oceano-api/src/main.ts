import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Oceano Cashback Backend Service API')
    .setDescription('This documentation is for the Oceano Cashback Backend Service API. The Oceano Cashback Backend Service API is a RESTful API that allows you to manage users, products, and orders in the Deep Dive Platform. The API is both connected to a PostgreSQL database and a blockchain network (POLYGON, MUMBAI) and user balances are reflected as ERC20-compliant SAL tokens on the blockchain.')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3001);
}

bootstrap();