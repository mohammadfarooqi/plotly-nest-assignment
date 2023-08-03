import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field((type) => String)
  id: string;

  @Field()
  name: string;

  @Field((type) => Int)
  price: number;
}
