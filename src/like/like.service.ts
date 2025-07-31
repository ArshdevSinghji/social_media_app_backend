import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async createLike(userId: number, postId: number) {
    const like = this.likeRepository.create({
      user: { userId },
      post: { postId },
    });
    return this.likeRepository.save(like);
  }

  async removeLike(userId: number, postId: number) {
    return this.likeRepository.delete({ user: { userId }, post: { postId } });
  }
}
