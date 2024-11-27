import { Field, ObjectType } from '@nestjs/graphql';
import { Link } from 'src/links/models/link.model';
import { AbstractModel } from 'src/users/models/abstract.model';

@ObjectType()
export class Bookmark extends AbstractModel {
  @Field()
  readonly name: string;

  @Field()
  readonly userId: string;

  @Field(() => [Link], { nullable: true })
  readonly links: Link[];
}
