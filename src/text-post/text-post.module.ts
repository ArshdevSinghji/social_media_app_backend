import { Module } from '@nestjs/common';
import { TextPostService } from './text-post.service';
import { TextPostController } from './text-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextPost } from './entities/text-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TextPost])],
  controllers: [TextPostController],
  providers: [TextPostService],
  exports: [TextPostService],
})
export class TextPostModule {}
