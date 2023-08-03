import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field((type) => String)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column('double')
  @Field((type) => Float)
  price: number;
}
