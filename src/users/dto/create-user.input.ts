import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsPositive } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsPositive()
  @Field((type) => Int)
  age: number;

  @Field((type) => [ID], { nullable: true })
  orders?: string[];
}
