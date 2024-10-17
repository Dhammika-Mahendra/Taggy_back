import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractSchema } from "src/database/abstract.schema";

@Schema({versionKey:false})
export class UserDocument extends AbstractSchema{
    @Prop()
    email : string;

    @Prop()
    password : string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);