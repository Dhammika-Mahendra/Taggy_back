import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmpty, IsString } from "class-validator";

@ArgsType()
export class GetUserArgs {
    @Field()
    @IsEmpty()
    @IsString()
    readonly _id: string;
}
