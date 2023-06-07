import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    forwardRef(() => ChatModule),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
