import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  async findAll(): Promise<Product[]> {
    const product = new Product();
    product.id = '1';
    product.name = 'Product 1';
    product.price = 22;

    return [product];
  }
}
