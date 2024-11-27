import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from './abstract.schema';

@Schema({ versionKey: false })
export class LinkDocument extends AbstractSchema {
  @Prop()
  title: string;

  @Prop({ nullable: true })
  siteName: string;

  @Prop()
  url: string;

  @Prop()
  datetime: Date;
}

export const LinkSchema = SchemaFactory.createForClass(LinkDocument);
