import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { MongoRepository  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Chat} from './entities/chat.entity';
import {ObjectId} from 'mongodb';

@Injectable()
export class ChatService {
  constructor (
    @InjectRepository(Chat)
    private userRepository: MongoRepository<Chat>,
    ) {}

  async create(input: CreateChatInput, id : any) : Promise<Chat> {
    const chat = new Chat();
    chat.question = input.questionField;
    chat.answer = input.answerField;
    chat.authorId = id; 
    chat.createdAt = Date.now().toString();
    return await this.userRepository.save(chat);
  }

  async findAll(userId : number) : Promise<Chat[]>{
    return await this.userRepository.find({where: {authorId: userId}});
  }

  async getChats(userId : string) : Promise<Chat[]>{
    return await this.userRepository.find({where: {authorId: userId}});
  }
}
