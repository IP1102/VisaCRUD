import { Expose } from "class-transformer";

export class ProductDto {

    @Expose()
    id: string;

    @Expose()
    country: string;

    @Expose()
    type: string;

    @Expose()
    price: number;

    @Expose()
    lengthOfStay: number;
    
    @Expose()
    numberOfEntries: string;

    @Expose()
    filingFee: number;
}