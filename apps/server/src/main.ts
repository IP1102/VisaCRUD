/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ProductSeeder } from './database/seeds/product.seeder';
import { dataSource } from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    
    const seeder = new ProductSeeder();
    await seeder.run(dataSource);
    Logger.log('Database seeding completed successfully');
  } catch (error) {
    Logger.error('Error running database seeder:', error);
  }
}
bootstrap();
