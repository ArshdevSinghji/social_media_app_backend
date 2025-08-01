import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuotePost } from './entities/quote-post.entity';
import { Repository } from 'typeorm';
import { CreateQuotePostDto } from './dto/create-quote-post.dto';

@Injectable()
export class QuotePostService {
  constructor(
    @InjectRepository(QuotePost)
    private quotePostRepository: Repository<QuotePost>,
  ) {}

  async createQuotePost(createQuotePost: CreateQuotePostDto) {
    const quotePost = this.quotePostRepository.create({ ...createQuotePost });
    return await this.quotePostRepository.save(quotePost);
  }
}
