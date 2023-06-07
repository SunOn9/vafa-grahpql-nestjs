import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Resolver((of) => Chat)
export class ChatResolver {
  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  @Mutation(() => Chat)
  async createChat(@Args('input') input: CreateChatInput) {
    return await this.chatService.create(input);
  }

  @Query(() => [Chat], { name: 'chat' })
  async findAll(@Args('authorId', { type: () => ID}) authorId: number) {
    return await this.chatService.findAll(authorId);
  }

  @ResolveField(returns => User)
  async author(@Parent() chat: Chat) : Promise<User> {
    return await this.userService.getUser(chat.authorId);
  }
}
 