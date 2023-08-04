import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // seed some products by default
  const productsService = app.get(ProductsService);
  const insertedProducts = await productsService.seedData();

  // seed some users by default
  const usersService = app.get(UsersService);
  await usersService.seedData(insertedProducts);

  await app.listen(3000);
}
bootstrap();
