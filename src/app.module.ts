import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { TextPostModule } from './text-post/text-post.module';
import { QuotePostModule } from './quote-post/quote-post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    PostModule,
    LikeModule,
    TextPostModule,
    QuotePostModule,
    AuthModule,
  ],
})
export class AppModule {}
