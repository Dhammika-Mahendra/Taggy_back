import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractModel } from "src/users/models/abstract.model";

@ObjectType()
export class User extends AbstractModel {
    @Field()
    readonly email: string;
}
