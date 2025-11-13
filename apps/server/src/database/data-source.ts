import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Product } from '../app/products/entity/product';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'joinsherpa',
  synchronize: true, // If set to true, the database will be dropped and recreated on every application start.
  logging: true,
  entities: [Product],
};

export const dataSource = new DataSource(dataSourceOptions);
