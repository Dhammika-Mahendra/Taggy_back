import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { Bookmark } from './model/Bookmark.model';
import { UserIDdeco } from 'src/auth/guards/UserId.decorator';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';

@Resolver()
export class BookmarksResolver {
    constructor(private readonly bookmarkService : BookmarksService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bookmark)
    async createBookmark(
      @Args('createBookmarkData') createBookmarkData: CreateBookmarkInput,
      @UserIDdeco() userId: string,
    ) {
      return this.bookmarkService.createBookmark(createBookmarkData, userId);
    }
}
