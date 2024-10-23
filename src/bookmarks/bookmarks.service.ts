import { Injectable } from '@nestjs/common';
import { BookmarksRepository } from 'src/database/bookmark.repository';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { BookmarkDocument } from 'src/database/Bookmark.schema';

@Injectable()
export class BookmarksService {

    constructor(private readonly bookmarkRepository : BookmarksRepository) {}

    async createBookmark(createBookmarkData : CreateBookmarkInput, userId : string) {
        const bookmarkDocument = await this.bookmarkRepository.create({
            ...createBookmarkData,
            links: [],
            userId,
          });
          return this.toModel(bookmarkDocument);
    }

    private toModel(bookmarkDocument: BookmarkDocument) {
        return {
          _id: bookmarkDocument._id.toString(),
          ...bookmarkDocument,
        };
      }
}
