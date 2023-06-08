import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/entities/chat.entity';
import { CreateUserResponse } from './dto/create-user.response';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  @Mutation(() => CreateUserResponse)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @ResolveField(returns => [Chat])
  async chats(@Parent() user: User) : Promise<Chat[]>{
    return await this.chatService.getChats(user._id.toString())
  }
}
