import { Injectable, Inject} from '@nestjs/common';
import { MongoRepository  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input';
import {ObjectId} from 'mongodb'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
      private userRepository: MongoRepository<User>
    ) {}

  async create(input : CreateUserInput) : Promise<User>{
    const user = new User();
    user.email = input.emailField;
    user.password = input.passwordField;
    return await this.userRepository.save(user);
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async getUser(id : number): Promise<User> {
    const objectId = new ObjectId(id)
    return await this.userRepository.findOne({where: {_id: objectId}});
  }
}
