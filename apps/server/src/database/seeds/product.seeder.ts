import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { NumberOfEntries, Product } from '../../app/products/entity/product';
import * as fs from 'fs';
import * as Papa from 'papaparse';

export class ProductSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const isDev = process.env.NODE_ENV !== 'production';
    
    // In dev mode, drop and recreate the table
    if (isDev) {
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      
      const tableExists = await queryRunner.hasTable('products');
      
      if (tableExists) {
        console.log('Dropping products table...');
        await queryRunner.dropTable('products', true, true);
        console.log('Products table dropped.');
      }
      
      console.log('Creating products table...');

      await dataSource.synchronize();
      console.log('Products table created.');
      
      await queryRunner.release();
    }

    const repo = dataSource.getRepository(Product);

    const csvPath = 'dist/apps/server/assets/products.csv';
    const csvString = fs.readFileSync(csvPath, 'utf8');

    const parsed = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data as any[];

    for (const row of rows) {
      if (row.lengthOfStay) row.lengthOfStay = Number(row.lengthOfStay);
      if (row.filingFee) row.filingFee = Number(row.filingFee);
      if (row.numberOfEntries) row.numberOfEntries = row.numberOfEntries as unknown as NumberOfEntries;

      const product = repo.create(row);
      await repo.save(product);
    }

    console.log(`Seeded ${rows.length} products`);
  }
}