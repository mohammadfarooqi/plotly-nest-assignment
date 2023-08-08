import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProductsService } from '../products/products.service';
import { faker } from '@faker-js/faker';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  async seedData(products: Product[]): Promise<User[]> {
    // Seed data for testing purposes
    const users = Array(5)
      .fill(null)
      .map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 65 }),
        orders: Array(faker.number.int({ min: 0, max: 5 }))
          .fill(null)
          .map(() => {
            const randomNumber = faker.number.int({ min: 0, max: 9 });
            return products[randomNumber].id;
          }),
      }));

    const results = [];

    for (const user of users) {
      results.push(await this.createUser(user));
    }

    return results;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    let orders = [];
    if (createUserInput.orders?.length) {
      orders = await this.productsService.findByIds(createUserInput.orders);
    }

    const newUser = this.usersRepository.create({
      ...createUserInput,
      orders,
    });
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: { id },
    });
  }

  async findProductsForUser(userId: string): Promise<Product[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.orders;
  }

  // update(id: string, updateUserInput: UpdateUserInput) {
  //   return this.usersRepository.update({ id }, updateUserInput);
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
