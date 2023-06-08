import { Injectable, Inject} from '@nestjs/common';
import { MongoRepository  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input';
import {ObjectId} from 'mongodb'
import * as bcrypt from 'bcrypt'
import { CreateUserResponse } from './dto/create-user.response';


@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
      private userRepository: MongoRepository<User>
    ) {}

  async create(input : CreateUserInput) : Promise<CreateUserResponse>{
    const user = await this.findOne(input.emailField)
    if (user) {
      return {
        success: false,
        message: 'This email has already been registered!'
      }
    } else {
      const newUser = new User();
      const saltRounds = 10;
      const hashPassword : string = await bcrypt.hash(input.passwordField, saltRounds)

      newUser.email = input.emailField;
      newUser.password = hashPassword;
      const res = await this.userRepository.save(newUser);
      return {
        success: true,
        message: `Created user ${res.email} successfully`
      }
    }
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async getUser(id : number): Promise<User> {
    const objectId = new ObjectId(id)
    return await this.userRepository.findOne({where: {_id: objectId}});
  }
}
