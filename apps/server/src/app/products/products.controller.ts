import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.getProduct(id);
  }
}
