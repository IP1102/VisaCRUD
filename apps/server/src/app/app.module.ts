import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../database/data-source';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';


@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    CurrencyExchangeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
