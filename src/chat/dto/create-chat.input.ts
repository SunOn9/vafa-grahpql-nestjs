import { InputType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'typeorm';

@InputType()
export class CreateChatInput {
  @Field(() => String, { description: 'Question field ()' })
  questionField: string;

  @Field(() => String, { description: 'Answer field ()' })
  answerField: string;
}
