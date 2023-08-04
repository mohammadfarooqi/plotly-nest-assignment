import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async seedData(): Promise<Product[]> {
    // Seed data for testing purposes
    const products = Array(10)
      .fill(null)
      .map(() => ({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 0.01, max: 10 })),
      }));

    const results = [];

    for (const product of products) {
      const newProduct = this.productsRepository.create(product);
      results.push(await this.productsRepository.save(newProduct));
    }

    return results;
  }

  createProduct(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductInput);
    return this.productsRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productsRepository.findOneOrFail({ where: { id } });
  }

  findByIds(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findBy({
      id: In(ids),
    });
  }
}
