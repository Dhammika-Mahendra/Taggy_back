import { Injectable } from '@nestjs/common';
import { GetLinksArgs } from './dto/args/get-links-args.dto';

@Injectable()
export class LinksService {
  async getLinks(getLinksArgs: GetLinksArgs) {
    return getLinksArgs.urls.map((url) => ({
      title: url,
      siteName: null,
      url: url,
      images: []
    }));
  }
}
