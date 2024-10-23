import { Module } from '@nestjs/common';
import { BookmarksResolver } from './bookmarks.resolver';
import { BookmarksService } from './bookmarks.service';
import { BookmarksRepository } from 'src/database/bookmark.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkDocument, BookmarkSchema } from 'src/database/Bookmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: BookmarkDocument.name,schema: BookmarkSchema}])
  ],
  providers: [BookmarksResolver, BookmarksService, BookmarksRepository]
})
export class BookmarksModule {}
