import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";


//This is for sharing the common property of _id amoung all the schemas

@Schema()
export class AbstractSchema {
    @Prop({type:SchemaTypes.ObjectId})
    _id: string;
}