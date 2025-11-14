import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConvertCurrencyError } from '../errors/currency-exchange.error';

interface ConvertCurrencyOutput {
    convertedAmount: number;
    rate: number;
    cache: boolean;
}

@Injectable()
export class CurrencyExchangeService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(Logger)
        private readonly logger: LoggerService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    async convertCurrency({amount, fromCurrency, toCurrency}:  {amount: number, fromCurrency: string, toCurrency: string }): Promise<ConvertCurrencyOutput> {
        try {
            const object = await this.getConversionRates(fromCurrency, toCurrency);
            let convertedAmount = amount * object.rate;
            convertedAmount = Math.round((convertedAmount + Number.EPSILON) * 100) / 100;
            return {
                convertedAmount,
                rate: object.rate,
                cache: object.cache
            };
        } catch (error) {
            this.logger.error(`Currency conversion error: ${error.message}`);
            throw new ConvertCurrencyError(fromCurrency, toCurrency, `Currency conversion failed: ${error.message}`);
        }
    }


    async getConversionRates(fromCurrency: string = 'USD', toCurrency: string): Promise<{rate: number, cache: boolean}> {
        try {
            let cache = true;
            const cacheKey = `rates_${fromCurrency}`;
            let rates: Record<string, number> = await this.cacheManager.get(cacheKey);

            if (!rates) {
                this.logger.log(`Fetching exchange rates for ${fromCurrency} from API`);
                cache = false;
                
                const url = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`;
                const response = await this.httpService.axiosRef.get(url);
                
                if (response.status !== 200) {
                    this.logger.error(`Failed to fetch exchange rates: ${response.statusText}`);
                    throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
                }

                rates = response.data.conversion_rates;

                const currentUnixTimestamp: number = Math.floor(Date.now() / 1000);
                const ttlSeconds = Math.max(response.data.time_next_update_unix - currentUnixTimestamp, 0);

                await this.cacheManager.set(cacheKey, rates, ttlSeconds);

                this.logger.log(`Caching exchange rates for ${fromCurrency} with TTL of ${ttlSeconds} seconds`);
            }

            const rate = rates[toCurrency];
            if (!rate) {
                throw new Error(`Unsupported target currency: ${toCurrency}`);
            }

            return {rate, cache: cache};
        } catch (error) {
            throw new Error(`Currency conversion failed: ${error.message}`);
        }
    }

}
