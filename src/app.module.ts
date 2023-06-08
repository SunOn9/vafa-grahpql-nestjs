import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { User } from './user/entities/user.entity';
import { Chat } from './chat/entities/chat.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://atta:190501@cluster0.zdkcp1y.mongodb.net/?retryWrites=true&w=majority',
      database: 'vafa-nest-graphql',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User, Chat],
    }),
    UserModule,
    ChatModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
