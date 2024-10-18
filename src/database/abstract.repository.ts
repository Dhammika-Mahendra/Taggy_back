import { Logger, NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, Types } from "mongoose";
import { AbstractSchema } from "./abstract.schema";

//Abstract methods are explicitly defined here (repository functons)

export abstract class AbstractRepository<TDocument extends AbstractSchema> { 

    constructor(protected readonly model: Model<TDocument>) {}


    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> { 
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }


    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> { 
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            throw new NotFoundException('Document not found');
        }
        return document as TDocument;
    }

}




