import { Injectable } from '@nestjs/common';
import { CreateQuotePostDto } from './dto/create-quote-post.dto';
import { UpdateQuotePostDto } from './dto/update-quote-post.dto';

@Injectable()
export class QuotePostService {
  create(createQuotePostDto: CreateQuotePostDto) {
    return 'This action adds a new quotePost';
  }

  findAll() {
    return `This action returns all quotePost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quotePost`;
  }

  update(id: number, updateQuotePostDto: UpdateQuotePostDto) {
    return `This action updates a #${id} quotePost`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotePost`;
  }
}
