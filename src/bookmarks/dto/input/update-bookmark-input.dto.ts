import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LinkInput } from 'src/links/dto/input/link.input';


@InputType()
export class UpdateBookmarkInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  _id: string;

  @Field(() => [LinkInput])
  @ValidateNested({ each: true })
  @Type(() => LinkInput)
  links: LinkInput[];
}
