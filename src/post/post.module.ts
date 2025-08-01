import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TextPostModule } from 'src/text-post/text-post.module';
import { QuotePostModule } from 'src/quote-post/quote-post.module';
import { Post } from './entities/post.entity';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
    TextPostModule,
    QuotePostModule,
    LikeModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
