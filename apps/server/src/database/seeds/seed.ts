import { Logger } from '@nestjs/common';
import { ProductSeeder } from './product.seeder';
import { dataSource } from '../data-source';

async function seed() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    
    const seeder = new ProductSeeder();
    await seeder.run(dataSource);
    Logger.log('Database seeding completed successfully');
    
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    Logger.error('Error running database seeder:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

seed();
