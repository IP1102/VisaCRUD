import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NumberOfEntries } from '../entity/product';
import { IsMinMax } from '../../decorators/min-max-validator.decorator';

export class FindProductsDto {
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsMinMax('minPrice')
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsMinMax('maxPrice')
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsMinMax('minLengthOfStay')
  maxLengthOfStay?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsMinMax('maxLengthOfStay')
  minLengthOfStay?: number;

  @IsOptional()
  @IsEnum(NumberOfEntries)
  numberOfEntries?: NumberOfEntries;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsMinMax('minFilingFee')
  maxFilingFee?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsMinMax('maxFilingFee')
  minFilingFee?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  limit?: number;
}
