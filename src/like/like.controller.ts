import { Body, Controller, Delete, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async likePost(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.createLike(createLikeDto);
  }

  @Delete()
  async removeLike(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.removeLike(createLikeDto);
  }
}
