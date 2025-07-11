import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');

  app.enableCors({ origin: allowedOrigins });

  const config = new DocumentBuilder()
    .setTitle('Announcement API')
    .setContact('Marcos Oliveira', 'https://www.linkedin.com/in/marcos-oliveiraaa/', 'marcosoliveira.rd@gmail.com')
    .setDescription('The Announcement API, you can use it to manage your announcements. please authorize with your token.')
    .setVersion('0.14.2')
    .addBearerAuth({
      description: 'Please enter token in following format: Bearer <JWT>',
      name: 'Authorization',
      type: 'http',
      bearerFormat: 'Bearer',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
