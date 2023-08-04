import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { faker } from '@faker-js/faker';

describe('ProductsService', () => {
  let service: ProductsService;

  const fakeProducts: Product[] = Array(10)
    .fill(null)
    .map((_, idx) => ({
      id: (idx + 1).toString(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 0.01, max: 10 })),
    }));

  const mockProductsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((product) =>
      Promise.resolve({
        id: faker.number.int({ min: 1, max: 100 }).toString(),
        ...product,
      }),
    ),
    find: jest.fn().mockImplementation(() => Promise.resolve(fakeProducts)),
    findOneOrFail: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(fakeProducts.find((p) => p.id === id)),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product', async () => {
    const product = {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 0.01, max: 10 })),
    };

    const newProduct = await service.createProduct(product);

    expect(newProduct).toEqual({
      id: expect.any(String),
      ...product,
    });
  });

  it('should list all products', async () => {
    const products = await service.findAll();

    expect(products).toEqual(await mockProductsRepository.find());
  });
});
