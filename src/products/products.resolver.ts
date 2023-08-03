import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query((returns) => Product)
  getProduct(@Args('id', { type: () => String }) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Query((returns) => [Product])
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Mutation((returns) => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }
}
