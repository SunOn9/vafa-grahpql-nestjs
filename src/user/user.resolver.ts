import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CreateUserResponse } from './dto/create-user.response';
import { ActivateUserResponse } from './dto/activate-user.response';
import { ChangePasswordInput } from './dto/changePassword-user.input';
import { ResetPasswordInput } from './dto/resetPassword-user.input';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}
  
  @Mutation(() => CreateUserResponse)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => ActivateUserResponse) 
  async activateUser(@Args('input') _id: string) : Promise<ActivateUserResponse>{
    return await this.userService.activateUser(_id)
  }

  @Mutation(() => Boolean) 
  async changePassword(@Args('input') input : ChangePasswordInput) : Promise<boolean>{
    return await this.userService.chagePassword(input)
  }

  @Mutation(() => Boolean)
  async sendMailResetPassword(@Args('input') input : ResetPasswordInput): Promise<boolean>{
    return await this.userService.sendMailReset(input)
  }

}
