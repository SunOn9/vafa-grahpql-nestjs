import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActivateUserResponse {
  @Field(() => Boolean, { description: 'Success field ()' })
  success: boolean;

  @Field(()=> Boolean, { description: ' Message ()' })
  error: boolean;
}
