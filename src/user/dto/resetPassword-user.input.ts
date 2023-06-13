import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
  @Field(() => String, { description: 'Email field ()' })
  email: string;
}
