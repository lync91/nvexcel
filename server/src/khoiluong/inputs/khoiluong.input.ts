import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class MauKhoiLuongInPut {
  @Field()
  readonly loaiCongTrinh: String;
  @Field()
  readonly tenBoPhan: String;
  @Field()
  readonly data: String;
}
