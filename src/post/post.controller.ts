import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findPosts(
    @Query('orderBy') orderBy?: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('userId') userId?: number,
  ) {
    return await this.postService.findPosts(orderBy, limit, page, userId);
  }

  @Post()
  async createPost(@Body() postDto: PostDto) {
    return this.postService.createPost(postDto);
  }

  @Delete('/:postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(+postId);
  }
}
