import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Product } from '../products/entities/product.entity';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => User, { name: 'createUser' })
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    console.log('createUserInput', createUserInput);
    return this.usersService.createUser(createUserInput);
  }

  @Query((returns) => [User], { name: 'getAllUsers' })
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User, { name: 'getUser' })
  getUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ResolveField((returns) => [Product])
  async orders(@Parent() user: User): Promise<Product[]> {
    console.log('user new', user);
    const { id } = user;
    return this.usersService.findProductsForUser(id);
  }

  // @Mutation((returns) => User, { name: 'updateUser' })
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
