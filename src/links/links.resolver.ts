import { Args, Query, Resolver } from '@nestjs/graphql';
import { Link } from './models/link.model';
import { LinksService } from './links.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { GetLinksArgs } from './dto/args/get-links-args.dto';

@Resolver(() => Link)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Link], { name: 'links' })
  async getLinks(@Args() getLinksArgs: GetLinksArgs) {
    return this.linksService.getLinks(getLinksArgs);
  }
}