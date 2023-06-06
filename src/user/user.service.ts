import { Injectable, Inject} from '@nestjs/common';
import { MongoRepository, ObjectId  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input';

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

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({where: {email: email}});
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({where: {_id: id}});
  }

}
