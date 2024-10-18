import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "src/database/abstract.repository";
import { UserDocument } from "./User.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class UserRepository extends AbstractRepository<UserDocument>{

    constructor(@InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>){
        super(userModel);
    }

    
}