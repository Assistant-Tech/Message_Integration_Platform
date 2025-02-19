import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Patch Swagger to support Zod schemas
  patchNestJsSwagger();

  const configService = app.get(ConfigService);

  // Get environment variables with fallback values
  const PORT = configService.get<number>('PORT') || 3000;
  const API_VERSION = configService.get<string>('API_VERSION') || 'v0.0';
  const NODE_ENV = configService.get<string>('NODE_ENV') || 'development';

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Message Integration Platform')
    .setDescription('The Message Integration Platform API description')
    .setVersion(API_VERSION)
    .addTag('Message Integration Platform')
    .build();

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost'], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  });

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Serve Swagger UI at /api/docs

  // Start the application
  await app.listen(PORT);

  Logger.log(`Application is running on: http://localhost:${PORT}`);
  Logger.log(`Swagger UI is available at: http://localhost:${PORT}/api/docs`);
}

bootstrap();
