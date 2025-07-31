import { Module } from '@nestjs/common';
import { QuotePostService } from './quote-post.service';
import { QuotePostController } from './quote-post.controller';

@Module({
  controllers: [QuotePostController],
  providers: [QuotePostService],
})
export class QuotePostModule {}
