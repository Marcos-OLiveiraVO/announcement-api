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
    .setDescription('The Announcement API, developed with Nest.js and TypeScript(Node.js).')
    .setVersion('0.7.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
