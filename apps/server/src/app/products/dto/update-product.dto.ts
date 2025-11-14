import { NumberOfEntries } from '../entity/product';

export class UpdateProductDto {
    country?: string;
    type?: string;
    price?: number;
    lengthOfStay?: number;
    numberOfEntries?: NumberOfEntries;
    filingFee?: number;
}

