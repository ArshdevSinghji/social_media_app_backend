import { Module } from '@nestjs/common';
import { TextPostService } from './text-post.service';
import { TextPostController } from './text-post.controller';

@Module({
  controllers: [TextPostController],
  providers: [TextPostService],
})
export class TextPostModule {}
