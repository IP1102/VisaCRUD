import { Logger, Module } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { HttpModule } from '@nestjs/axios';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3
    }),
    CacheModule.register(),
  ],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService, Logger],
  exports: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
