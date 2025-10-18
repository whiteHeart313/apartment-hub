import './alias-register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@app/filter/all-exceptions.filter';
import { logger } from '@app/utils/logger';

(async () => {
  logger.info('Starting apartment hub service...');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://frontend:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  logger.info('Configuring global validation pipe....');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 8080);
})()
  .then(() => {
    logger.info('Apartment hub service started successfully!');
  })
  .catch((err) => {
    logger.error('Failed to start apartment hub service:', err);
    process.exit(1);
  });
