import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { Product } from './entity/product';
import { Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from './dto/product.dto';
import { ProductCreateError, ProductUpdateError } from '../errors/product.error';
import { v4 as uuidv4 } from 'uuid';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: jest.Mocked<Repository<Product>>;
  let logger: jest.Mocked<Logger>;

  beforeEach(async () => {

    const repoMock: Partial<jest.Mocked<Repository<Product>>> = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const loggerMock = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: repoMock },
        { provide: Logger, useValue: loggerMock },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get(getRepositoryToken(Product));
    logger = module.get(Logger);

    service = module.get<ProductsService>(ProductsService);
  });

    describe('getProducts', () => {
    let qb: any;

    beforeEach(() => {
      qb = {
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getCount: jest.fn(),
        getMany: jest.fn(),
      };

      repo.createQueryBuilder.mockReturnValue(qb);
    });

    it('should filter, paginate, transform dto and return paginated response', async () => {
      qb.getCount.mockResolvedValue(20);
      qb.getMany.mockResolvedValue([{ id: '1', name: 'Test' }] as any);

      const dto = {
        country: 'CA',
        type: 'Tourist',
        page: 2,
        limit: 10,
      };

      const result = await service.getProducts(dto as any);

      expect(qb.andWhere).toHaveBeenCalledWith(
        'products.country = :country',
        { country: 'CA' }
      );

      expect(qb.skip).toHaveBeenCalledWith(10);
      expect(qb.take).toHaveBeenCalledWith(10);

      expect(result).toEqual({
        data: plainToInstance(ProductDto, [{ id: '1', name: 'Test' }], {
          excludeExtraneousValues: true,
        }),
        total: 20,
        page: 2,
        limit: 10,
        totalPages: 2,
      });
    });

    it('should handle numeric min/max filters', async () => {
      qb.getCount.mockResolvedValue(5);
      qb.getMany.mockResolvedValue([]);

      await service.getProducts({
        minPrice: 10,
        maxPrice: 100,
        page: 1,
        limit: 10,
      } as any);

      expect(qb.andWhere).toHaveBeenCalledWith(
        'products.price >= :minPrice',
        { minPrice: 10 }
      );

      expect(qb.andWhere).toHaveBeenCalledWith(
        'products.price <= :maxPrice',
        { maxPrice: 100 }
      );
    });
  });

  describe('createProduct', () => {
    it('should create and return a DTO', async () => {
      const testUUID = uuidv4();
      const mockProduct = { country: 'Mexico', id: testUUID } as Product;

      repo.create.mockReturnValue(mockProduct);
      repo.save.mockResolvedValue(mockProduct);

      const result = await service.createProduct({ country: 'Mexico' } as any);

      expect(repo.create).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalledWith(mockProduct);
      expect(result).toBeInstanceOf(ProductDto);
      expect(logger.log).toHaveBeenCalled();
    });

    it('should throw ProductCreateError on failure', async () => {
      repo.create.mockReturnValue({} as any);
      repo.save.mockRejectedValue(new Error('Save failed'));

      await expect(
        service.createProduct({ country: 'Mexico' } as any)
      ).rejects.toThrow(ProductCreateError);

      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('updateProduct', () => {
    it('should update and return updated product', async () => {
      const testUUID = uuidv4();

      repo.update.mockResolvedValue({} as any);
      repo.findOne.mockResolvedValue({ id: testUUID, country: 'RUS' } as any);

      const result = await service.updateProduct(testUUID, { country: 'RUS' });

      expect(repo.update).toHaveBeenCalledWith(testUUID, { country: 'RUS' });
      expect(result).toEqual({ id: testUUID, country: 'RUS' });
    });

    it('should throw ProductUpdateError on exception', async () => {
      repo.update.mockRejectedValue(new Error('Update failed'));

      await expect(
        service.updateProduct('a1b2c3d4-e5f6-7890-1234-567890abcdef', { country: 'ITA' })
      ).rejects.toThrow(ProductUpdateError);

      expect(logger.error).toHaveBeenCalled();
    });
  });
});
