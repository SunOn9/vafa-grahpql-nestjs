import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';

@Resolver((of) => Chat)
export class ChatResolver {
  constructor(
    private chatService: ChatService
  ) {}

  @Mutation(() => Chat)
  async createChat(@Args('input') input: CreateChatInput) {
    return this.chatService.create(input);
  }

  @Query(() => [Chat], { name: 'chat' })
  async findAll(@Args('authorId', { type: () => ID}) authorId: number) {
    return this.chatService.findAll(authorId);
  }
}
 