import { Injectable } from '@nestjs/common';
import { BookmarksRepository } from 'src/database/bookmark.repository';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { BookmarkDocument } from 'src/database/Bookmark.schema';
import { GetBookmarkArgs } from './dto/args/get-bookmark-args.dto';
import { UpdateBookmarkInput } from './dto/input/update-bookmark-input.dto';

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

    async getBookmarks(userId: string) {
      const bookmarkDocuments = await this.bookmarkRepository.find({ userId});
      return bookmarkDocuments.map((bookmarkDocument) => this.toModel(bookmarkDocument));
    }

    async getBookmark(getBookmarkArgs : GetBookmarkArgs, userId: string) {
      const bookmarkDocument = await this.bookmarkRepository.findOne({
        ...getBookmarkArgs,
        userId,
      });
      return this.toModel(bookmarkDocument);
    }

    async updateBookmark(
      updateBookmarkData: UpdateBookmarkInput,
      userId: string,
    ) {
      const bookmarkDocument = await this.bookmarkRepository.findOneAndUpdate(
        { _id: updateBookmarkData._id, userId },
        updateBookmarkData,
      );
      return this.toModel(bookmarkDocument);
    }

    private toModel(bookmarkDocument: BookmarkDocument) {
        return {
          _id: bookmarkDocument._id.toString(),
          ...bookmarkDocument,
        };
      }
}
