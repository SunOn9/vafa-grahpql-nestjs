import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { MongoRepository  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Chat} from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor (
    @InjectRepository(Chat)
    private userRepository: MongoRepository<Chat>,
    ) {}

  create(input: CreateChatInput) : Promise<Chat> {
    const chat = new Chat();
    chat.question = input.questionField;
    chat.answer = input.answerField;
    chat.authorId = input.userIdField;
    chat.createdAt = Date.now().toString();
    return this.userRepository.save(chat);
  }

  findAll(userId : number) : Promise<Chat[]>{
    return this.userRepository.find({where: {authorId: userId}});
  }
}
