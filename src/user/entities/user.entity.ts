import {Field, ID, ObjectType} from "@nestjs/graphql"
import { Column, Entity, ObjectIdColumn} from "typeorm";

@Entity()
@ObjectType()
export class User{
    @ObjectIdColumn()
    @Field(type => ID)
    _id : number;

    @Column()
    @Field()   
    email : string;

    @Column()
    @Field()
    password : string;
}    