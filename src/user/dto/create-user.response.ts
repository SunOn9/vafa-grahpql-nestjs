import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateUserResponse {
  @Field(() => Boolean, { description: 'Success field ()' })
  success: boolean;

  @Field(()=> String, { description: ' Message ()'})
  message: string;
}
