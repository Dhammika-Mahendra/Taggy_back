import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../database/abstract.repository';
import { BookmarkDocument } from './Bookmark.schema';

@Injectable()
export class BookmarksRepository extends AbstractRepository<BookmarkDocument> {

  constructor(
    @InjectModel(BookmarkDocument.name) private readonly bookmarkModel: Model<BookmarkDocument>,
  ) {
    super(bookmarkModel);
  }

}
