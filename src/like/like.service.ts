import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async createLike(createLikeDto: CreateLikeDto) {
    const user = await this.userService.findUserById(createLikeDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postService.findPostById(createLikeDto.postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const like = this.likeRepository.create({
      user,
      post,
    });
    return await this.likeRepository.save(like);
  }

  async removeLike(createLikeDto: CreateLikeDto) {}
}
