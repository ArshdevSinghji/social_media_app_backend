import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async likeUnLikePost(post: Post, user: User) {
    const likePost = this.likeRepository.create({ post, user });

    const existingLike = await this.existingLike(post, user);
    if (existingLike) {
      return this.unLike(existingLike.likedId);
    }

    return this.likeRepository.save(likePost);
  }

  async existingLike(post: Post, user: User) {
    const query = this.likeRepository
      .createQueryBuilder('like')
      .where('like.postId = :postId', { postId: post.postId })
      .andWhere('like.userId = :userId', { userId: user.userId });

    return await query.getOne();
  }

  async unLike(likedId: number) {
    return await this.likeRepository.softDelete(likedId);
  }
}
