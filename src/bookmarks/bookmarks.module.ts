import { Module } from '@nestjs/common';
import { BookmarksResolver } from './bookmarks.resolver';
import { BookmarksService } from './bookmarks.service';
import { BookmarksRepository } from 'src/database/bookmark.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkDocument, BookmarkSchema } from 'src/database/Bookmark.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { LinksModule } from 'src/links/links.module';


@Module({
  imports: [
    MongooseModule.forFeature([{name: BookmarkDocument.name,schema: BookmarkSchema}]),
    AuthModule,
    UsersModule,
    LinksModule
  ],
  providers: [BookmarksResolver, BookmarksService, BookmarksRepository]
})
export class BookmarksModule {}
