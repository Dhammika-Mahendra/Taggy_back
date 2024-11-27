import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from './abstract.schema';
import { LinkDocument } from './link.schema';
import { Type } from 'class-transformer';

@Schema({ versionKey: false })
export class BookmarkDocument extends AbstractSchema {
  @Prop()
  name: string;

  @Prop()
  userId: string;

  @Prop({ type: [{ type: LinkDocument }], default: [], nullable: true  })
  @Type(() => LinkDocument)
  links: LinkDocument[];
}

export const BookmarkSchema = SchemaFactory.createForClass(BookmarkDocument);
