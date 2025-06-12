import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as dotenv from 'dotenv';
dotenv.config();

console.log('[main.ts] MINT_AUTHORITY_PRIVATE_KEY:', process.env.MINT_AUTHORITY_PRIVATE_KEY);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
      .setTitle('Medical Certificates API')
      .setDescription('API for creating and verifying medical certificates as NFTs on Solana blockchain')
      .setVersion('1.0')
      .addApiKey({ 
          type: 'apiKey', 
          name: 'x-api-key', 
          in: 'header',
          description: 'API key for authentication'
      }, 'api-key')
      .addTag('certificates', 'Operations with medical certificates')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  console.log('ENV:', process.env.EXTERNAL_API_KEY);
  await app.listen( 3001);
}
bootstrap();
