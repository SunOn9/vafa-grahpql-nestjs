import {Field, ID, ObjectType} from "@nestjs/graphql"
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn,} from "typeorm";

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