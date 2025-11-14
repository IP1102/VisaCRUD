import { IsISO4217CurrencyCode, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class CurrencyConvert {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNotEmpty()
    @IsString()
    @IsISO4217CurrencyCode()
    fromCurrency: string;

    @IsNotEmpty()
    @IsString()
    @IsISO4217CurrencyCode()
    toCurrency: string;
}