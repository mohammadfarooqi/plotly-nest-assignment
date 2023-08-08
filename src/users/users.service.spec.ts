import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductsService } from '../products/products.service';
import { faker } from '@faker-js/faker';
import { Product } from '../products/entities/product.entity';

describe('UsersService', () => {
  let service: UsersService;

  const fakeProducts: Product[] = Array(10)
    .fill(null)
    .map((_, idx) => ({
      id: (idx + 1).toString(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 0.01, max: 10 })),
    }));

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: faker.number.int({ min: 1, max: 100 }).toString(),
        ...user,
      }),
    ),
  };

  const mockProductsService = {
    findByIds: jest
      .fn()
      .mockImplementation((ids) =>
        Promise.resolve(
          fakeProducts.filter((product) => ids.includes(product.id)),
        ),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return that with 0 orders', async () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
    };

    const newUser = await service.createUser(user);

    expect(newUser).toEqual({
      id: expect.any(String),
      orders: expect.any(Array),
      ...user,
    });
  });

  it('should create a new user and return that with 1 product in orders', async () => {
    const randomNumber = faker.number.int({ min: 0, max: 9 });
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      orders: [fakeProducts[randomNumber].id],
    };

    const newUser = await service.createUser(user);

    expect(newUser).toEqual({
      ...user,
      id: expect.any(String),
      orders: [fakeProducts[randomNumber]],
    });
  });
});
