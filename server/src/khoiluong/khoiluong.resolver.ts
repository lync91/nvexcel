import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KhoiLuongService } from './khoiluong.service';

@Resolver()
export class CatsResolver {
  constructor(private readonly khoiLuongService: KhoiLuongService) { }
  @Mutation(() => String)
  async addTodo(@Args('type') type: String) {
    console.log(type);
    const id = 'generate()';
    const todo = '{ type, id };'
    return type;
  }
}
