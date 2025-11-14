import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { NumberOfEntries } from '../entity/product';

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    lengthOfStay?: number;

    @IsOptional()
    @IsEnum(NumberOfEntries)
    numberOfEntries?: NumberOfEntries;
    
    @IsOptional()
    @IsNumber()
    filingFee?: number;
}

