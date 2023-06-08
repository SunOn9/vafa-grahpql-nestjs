import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";

@ObjectType()
export class LoginResponse {
    @Field(() => String, { description: 'Access Token  ()', nullable: true })    
    access_token?: string;

    @Field(() => User, { description: ' User ()', nullable: true})
    user?: User;

    @Field(() => String, { description: ' Error ()', nullable: true})
    error?: string;
}