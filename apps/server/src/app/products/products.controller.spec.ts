import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FindProductsDto } from './dto/find-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: Partial<Record<keyof ProductsService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      getProducts: jest.fn(),
      getProduct: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: service }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('getProducts should call service.getProducts', async () => {
    const dto: FindProductsDto = { page: 1, limit: 10 } as any;
    const mockResult = { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
    service.getProducts.mockResolvedValue(mockResult);

    const result = await controller.getProducts(dto);

    expect(service.getProducts).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResult);
  });

  it('createProduct should call service.createProduct', async () => {
    const testUUID = uuidv4();
    const dto: CreateProductDto = { country: 'Visa' } as CreateProductDto;
    const mockResult = { id: testUUID, country: 'Visa' };
    service.createProduct.mockResolvedValue(mockResult);

    const result = await controller.createProduct(dto);

    expect(service.createProduct).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResult);
  });

  it('getProduct should call service.getProduct', async () => {
    const mockResult = { id: 'uuid', country: 'Visa' };
    service.getProduct.mockResolvedValue(mockResult);

    const result = await controller.getProduct('uuid');

    expect(service.getProduct).toHaveBeenCalledWith('uuid');
    expect(result).toEqual(mockResult);
  });

  it('updateProduct should call service.updateProduct', async () => {
    const dto: UpdateProductDto = { country: 'Updated' } as any;
    const mockResult = { id: 'uuid', country: 'Updated' };
    service.updateProduct.mockResolvedValue(mockResult);

    const result = await controller.updateProduct('uuid', dto);

    expect(service.updateProduct).toHaveBeenCalledWith('uuid', dto);
    expect(result).toEqual(mockResult);
  });
});
