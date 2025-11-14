export class FindProductsDto {
    country?: string;
    type?: string;
    maxPrice?: number;
    minPrice?: number
    maxLengthOfStay?: number;
    minLengthOfStay?: number
    numberOfEntries?: string;
    maxFilingFee?: number;
    minFilingFee?: number
    
    
    page?: number;
    limit?: number;
}