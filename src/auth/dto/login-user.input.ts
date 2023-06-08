import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class LoginUserInput {
    @Field(() => String, { description: 'Email Field  ()' })
    email: string;

    @Field(() => String, { description: 'Password Field  ()' })
    password: string;
}