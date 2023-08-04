import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query((returns) => Product, { name: 'getProduct' })
  getProduct(@Args('id', { type: () => ID }) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Query((returns) => [Product], { name: 'getAllProducts' })
  getAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Mutation((returns) => Product, { name: 'createProduct' })
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }
}
