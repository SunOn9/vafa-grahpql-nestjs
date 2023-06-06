import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('email', { type: () => String}) email: string) {
    return this.userService.findOne(email);
  }
  

}
