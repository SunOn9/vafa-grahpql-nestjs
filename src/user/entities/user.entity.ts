import {Field, ID, ObjectType} from "@nestjs/graphql"
import { Chat } from "src/chat/entities/chat.entity";
import { Column, Entity, ObjectIdColumn, OneToMany} from "typeorm";

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

    @Column()
    @Field(type => Boolean)
    activated : boolean = false;

}    