import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class MauKhoiLuongType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly loaiCongTrinh: string;
  @Field()
  readonly tenBoPhan: string;
  @Field()
  readonly data: string;
}
@ObjectType()
export class LoaiCongTrinhType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly value: string;
}