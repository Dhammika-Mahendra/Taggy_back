import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { Bookmark } from './model/Bookmark.model';
import { UserIDdeco } from 'src/auth/guards/UserId.decorator';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { GetBookmarkArgs } from './dto/args/get-bookmark-args.dto';
import { UpdateBookmarkInput } from './dto/input/update-bookmark-input.dto';

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

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bookmark)
    async updateBookmark(
      @Args('updateBookmarkData') updateBookmarkData: UpdateBookmarkInput,
      @UserIDdeco() userId: string,
    ) {
      return this.bookmarkService.updateBookmark(updateBookmarkData, userId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Bookmark], { name: 'bookmarks' })
    async getBookmarks(@UserIDdeco() userId: string) {
      return this.bookmarkService.getBookmarks(userId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Bookmark, { name: 'bookmark' })
    async getBookmark(@Args() getBookmarkArgs: GetBookmarkArgs, @UserIDdeco() userId: string) {
      return this.bookmarkService.getBookmark(getBookmarkArgs, userId);
    }
    
}
