import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { TextPostModule } from './text-post/text-post.module';
import { QuotePostModule } from './quote-post/quote-post.module';

@Module({
  imports: [UserModule, PostModule, LikeModule, TextPostModule, QuotePostModule],
})
export class AppModule {}
