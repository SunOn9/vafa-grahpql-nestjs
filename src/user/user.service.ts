import { Injectable, Inject} from '@nestjs/common';
import { MongoRepository  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input';
import {ObjectId} from 'mongodb'
import * as bcrypt from 'bcrypt'
import { CreateUserResponse } from './dto/create-user.response';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './dto/create-user.event';
import { ActivateUserResponse } from './dto/activate-user.response';
import { ChangePasswordInput } from './dto/changePassword-user.input';
import { ResetPasswordInput } from './dto/resetPassword-user.input';
import { ResetPasswordEvent } from './dto/resetPassword-user.event';


@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
      private userRepository: MongoRepository<User>,
    @Inject('EMAIL-SERVICE')
      private readonly emailService : ClientProxy,
    ) {}

  async create(input : CreateUserInput) : Promise<CreateUserResponse>{
    const user = await this.findOne(input.emailField)
    if (user) {
      return {
        success: false,
        message: 'This email has already been registered!'
      }
    } else {
      //* hash password
      const newUser = new User();
      const saltRounds = 10;
      const hashPassword : string = await bcrypt.hash(input.passwordField, saltRounds)

      //* save user to database
      newUser.email = input.emailField;
      newUser.password = hashPassword;
      const res = await this.userRepository.save(newUser);
      const id = res._id.toString()
      
      await this.emailService.emit('user_created', new CreateUserEvent({
        email: res.email,
        token: id
      }))

      return {
        success: true,
        message: `Created user ${res.email} successfully`
      }
    }
  }

  async sendMailReset(input : ResetPasswordInput) : Promise<boolean> {
    const user = await this.findOne(input.email)
    if (!user) return false
    await this.emailService.emit('reset_password', new ResetPasswordEvent({
      token : user._id.toString(),
      email: input.email
    }))
    return true
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async getUser(id : string): Promise<User> {
    const objectId = new ObjectId(id)
    return await this.userRepository.findOne({where: {_id: objectId}});
  }

  async chagePassword(input: ChangePasswordInput) : Promise<boolean> {
    const user = await this.getUser(input.id)
    if (user ) {
      const valid = await bcrypt.compare(input.oldPassword, user.password);
      if (!valid) return false
    } else{
      return false
    }

    const objectId = new ObjectId(input.id)
    const saltRounds = 10;
    const hashPassword : string = await bcrypt.hash(input.password, saltRounds)
    const res = await this.userRepository.updateOne({_id: objectId}, {$set: {password: hashPassword}})
    if (res.matchedCount === 1 && res.modifiedCount === 1) {
      return true
    } else 
      return false
  }

  async activateUser(_id: string): Promise<ActivateUserResponse>{
    const objectId = new ObjectId(_id)
    const res = await this.userRepository.updateOne({_id: objectId}, {$set: {activated: true}})
    if (res.matchedCount === 1) {
      if (res.modifiedCount === 1){
        return {
          success: true,
          error: false
        }
      } else {
        return {
          success: true,
          error: true
        }
      }
    } else{
      return {
        success: false,
        error: true
      }
    }
  }
}