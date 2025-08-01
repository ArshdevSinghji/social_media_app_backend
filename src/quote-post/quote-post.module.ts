import { Module } from '@nestjs/common';
import { QuotePostService } from './quote-post.service';
import { QuotePostController } from './quote-post.controller';
import { QuotePost } from './entities/quote-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuotePost])],
  controllers: [QuotePostController],
  providers: [QuotePostService],
  exports: [QuotePostService],
})
export class QuotePostModule {}
