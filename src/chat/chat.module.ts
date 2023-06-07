import { Module, forwardRef } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Chat]),
  ],
  providers: [ChatResolver, ChatService],
  exports: [ChatService]
})
export class ChatModule {}
