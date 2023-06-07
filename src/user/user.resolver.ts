import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ChatService } from 'src/chat/chat.service';
import { ObjectId } from 'mongodb';
import { Chat } from 'src/chat/entities/chat.entity';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('email', { type: () => String}) email: string) {
    return this.userService.findOne(email);
  }


  @ResolveField(returns => [Chat])
  async chats(@Parent() user: User) : Promise<Chat[]>{
    return await this.chatService.getChats(user._id.toString())
  }
}
