import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@Query(new ValidationPipe({transform: true})) query: FindProductsDto) {
    return this.productsService.getProducts(query);
  }

  @Post()
  async createProduct(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':id')
  async getProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }
}
