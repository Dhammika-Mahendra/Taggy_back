import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from './abstract.schema';

@Schema({ versionKey: false })
export class BookmarkDocument extends AbstractSchema {
  @Prop()
  name: string;

  @Prop()
  userId: string;

  @Prop()
  links: string[];
}

export const BookmarkSchema = SchemaFactory.createForClass(BookmarkDocument);
