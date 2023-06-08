import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent, Context } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver((of) => Chat)
export class ChatResolver {
  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  async createChat(@Args('input') input: CreateChatInput, @Context() context) {
    return await this.chatService.create(input, context.req.user._id);
  }

  @Query(() => [Chat], { name: 'chat' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context() context) {
    return await this.chatService.findAll(context.req.user._id);
  }

  @ResolveField(returns => User)
  async author(@Parent() chat: Chat) : Promise<User> {
    return await this.userService.getUser(chat.authorId);
  }
}
 