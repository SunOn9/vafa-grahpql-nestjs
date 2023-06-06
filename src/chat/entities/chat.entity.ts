import {Field, ID, ObjectType} from "@nestjs/graphql"
import { Column, Entity, ObjectIdColumn,} from "typeorm";

@Entity()
@ObjectType()
export class Chat{
    @ObjectIdColumn()
    @Field(type => ID)
    _id : number;

    @Column()
    @Field(type => ID)
    authorId : number;

    @Column()
    @Field()
    createdAt : string;

    @Column()
    @Field()   
    question : string;

    @Column()
    @Field()
    answer : string;
}