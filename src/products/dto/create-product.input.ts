import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsDecimal } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  price: GLfloat;
}
