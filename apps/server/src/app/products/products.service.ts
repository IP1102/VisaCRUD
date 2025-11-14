import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { Product } from './entity/product';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindProductsDto } from './dto/find-products.dto';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from './dto/product.dto';
import { ProductCreateError, ProductNotFoundError, ProductUpdateError } from '../errors/product.error';

@Injectable()
export class ProductsService {
    
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @Inject(Logger)
        private readonly logger: LoggerService
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

        this.logger.log(`Fetched ${data.length} products (Page: ${page}, Limit: ${limit}, Total: ${total})`);

        const dtoData = plainToInstance(ProductDto, data, {excludeExtraneousValues: true});
        
        return {
            data: dtoData,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getProduct(id: string) {
        try{
            const product = await this.productRepository.findOne({ where: { id } });
            return product? plainToInstance(ProductDto, product, {excludeExtraneousValues: true}) : null
        } catch(error){
            this.logger.error(`Error fetching product with id ${id}: ${error.message}`, error.stack, 'ProductsService');
            throw new ProductNotFoundError(id);
        }
    }


    async createProduct(createData: Omit<Product, 'id'>) {
        try{
            const product = this.productRepository.create(createData);
            const saved = await this.productRepository.save(product);

            this.logger.log(`Created product with id ${saved.id}`, 'ProductsService');
        
            return plainToInstance(ProductDto, saved, { excludeExtraneousValues: true });

        } catch (error) {
            this.logger.error(`Error creating product: ${error.message}`, error.stack, 'ProductsService');
            throw new ProductCreateError(error.message);
        }
    }

    async updateProduct(id: string, updateData: Partial<Product>) {
        try{
            await this.productRepository.update(id, updateData);
            return this.productRepository.findOne({ where: { id } });
        } catch (error) {
            this.logger.error(`Error updating product with id ${id}: ${error.message}`, error.stack, 'ProductsService');
            throw new ProductUpdateError(id, error.message);
        }
    }
}
