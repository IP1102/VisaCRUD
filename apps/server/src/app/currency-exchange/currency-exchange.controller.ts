import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CurrencyConvert } from './dto/currency-convert.dto';

interface ConvertCurrencyResponse {
    convertedAmount: number;
    rate: number;
    cache: boolean;
}

@Controller('currency-exchange')
export class CurrencyExchangeController {
    constructor(
        private readonly currencyExchangeService: CurrencyExchangeService
    ) {}

    @Post('convert')
    async convertCurrency(@Body(new ValidationPipe()) currencyConvertDto: CurrencyConvert): Promise<ConvertCurrencyResponse> {
        const data = await this.currencyExchangeService.convertCurrency({
            amount: currencyConvertDto.amount,
            fromCurrency: currencyConvertDto.fromCurrency,
            toCurrency: currencyConvertDto.toCurrency
        }
        );

        return {
            convertedAmount: data.convertedAmount,
            rate: data.rate,
            cache: data.cache
        }
    }

}
