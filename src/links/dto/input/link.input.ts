import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LinkInput {
  @Field()
  readonly title: string;

  @Field({ nullable: true })
  readonly siteName?: string;

  @Field()
  readonly url: string;

  @Field()
  readonly datetime: Date;
}
