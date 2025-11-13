import { Injectable } from '@nestjs/common';
import { Product } from './entity/product';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async getProducts() {
        return this.productRepository.find();
    }

    async getProduct(id: string) {
        return this.productRepository.findOne({ where: { id } });
    }
}
