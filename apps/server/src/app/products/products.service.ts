import { Injectable } from '@nestjs/common';
import { Product } from './entity/product';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindProductsDto } from './dto/find-products.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async getProducts(dto: FindProductsDto) {
        const {
            country,
            type,
            numberOfEntries,
            minPrice,
            maxPrice,
            minLengthOfStay,
            maxLengthOfStay,
            minFilingFee,
            maxFilingFee,
            page = 1,
            limit = 10,
          } = dto;

        const queryBuilder = this.productRepository.createQueryBuilder('products');

        country && country != undefined && queryBuilder.andWhere('products.country = :country', { country })
        type && type != undefined && queryBuilder.andWhere('products.type = :type', { type })
        numberOfEntries && numberOfEntries != undefined && queryBuilder.andWhere('products.numberOfEntries = :numberOfEntries', { numberOfEntries });

        if (minPrice !== undefined) {
            queryBuilder.andWhere('products.price >= :minPrice', { minPrice });
          }
        
          if (maxPrice !== undefined) {
            queryBuilder.andWhere('products.price <= :maxPrice', { maxPrice });
          }
        
          if (minLengthOfStay !== undefined) {
            queryBuilder.andWhere('products.lengthOfStay >= :minLengthOfStay', { minLengthOfStay });
          }
        
          if (maxLengthOfStay !== undefined) {
            queryBuilder.andWhere('products.lengthOfStay <= :maxLengthOfStay', { maxLengthOfStay });
          }
        
          if (minFilingFee !== undefined) {
            queryBuilder.andWhere('products.filingFee >= :minFilingFee', { minFilingFee });
          }
        
          if (maxFilingFee !== undefined) {
            queryBuilder.andWhere('products.filingFee <= :maxFilingFee', { maxFilingFee });
          }
        
        const total = await queryBuilder.getCount();
        
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        
        const data = await queryBuilder.getMany();
        
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getProduct(id: string) {
        return this.productRepository.findOne({ where: { id } });
    }

    async updateProduct(id: string, updateData: Partial<Product>) {
        console.log(updateData)
        await this.productRepository.update(id, updateData);
        return this.productRepository.findOne({ where: { id } });
    }
}
