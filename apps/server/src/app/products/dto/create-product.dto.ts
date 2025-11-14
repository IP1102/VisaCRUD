import { NumberOfEntries } from '../entity/product';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    lengthOfStay: number;

    @IsNotEmpty()
    @IsEnum(NumberOfEntries)
    numberOfEntries: NumberOfEntries;

    @IsNotEmpty()
    @IsNumber()
    filingFee: number;
}

