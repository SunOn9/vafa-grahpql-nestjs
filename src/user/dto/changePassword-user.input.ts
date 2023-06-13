import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput{
  @Field(() => String, { description: 'Id field ()' })
  id: string;

  @Field(() => String, { description: 'Old password field ()' })
  oldPassword: string;

  @Field(() => String, { description: 'Password field ()' })
  password: string;
}
