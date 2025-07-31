import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LikeService } from 'src/like/like.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService,
  ) {}

  @Get()
  async findPosts(
    @Query('orderBy') orderBy?: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    return await this.postService.findPosts(orderBy, limit, page);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    const email = req.user.email;
    return this.postService.createPost(createPostDto, email);
  }

  @UseGuards(AuthGuard)
  @Post('/:postId/like')
  async likePost(@Param('postId') postId: string, @Req() req: any) {
    const userId = req.user.userId;
    return this.likeService.createLike(+userId, +postId);
  }

  @UseGuards(AuthGuard)
  @Delete('/:postId/like')
  async unlikePost(@Param('postId') postId: string, @Req() req: any) {
    const userId = req.user.userId;
    return this.likeService.removeLike(+userId, +postId);
  }

  @UseGuards(AuthGuard)
  @Delete('/:postId')
  async deletePost(@Param('postId') postId: string, @Req() req: any) {
    return this.postService.deletePost(+postId);
  }
}
