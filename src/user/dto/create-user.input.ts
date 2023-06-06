import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email field ()' })
  emailField: string;

  @Field(() => String, { description: 'Password field ()' })
  passwordField: string;
}
