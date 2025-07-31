import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UserService } from 'src/user/user.service';
import { PostType } from 'src/enum';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TextPostService } from 'src/text-post/text-post.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UserService,
    private textPostService: TextPostService,
  ) {}

  async findPosts(orderBy?: string, limit?: number, page?: number) {
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes');

    if (orderBy) {
      if (orderBy === 'DESC') query.orderBy(`post.${orderBy}`, 'DESC');
      else if (orderBy === 'ASC') query.orderBy(`post.${orderBy}`, 'ASC');
      else throw new BadRequestException('Invalid orderBy parameter');
    }

    if (limit) {
      query.take(limit);
    }

    if (page) {
      query.skip((page - 1) * (limit || 10));
    }

    return await query.getMany();
  }

  async createPost(updatePostDto: UpdatePostDto, email: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const post = this.postRepository.create({
      ...updatePostDto,
      user,
    });

    if (post.type === PostType.TEXT && updatePostDto.content) {
      await this.textPostService.createTextPost(
        updatePostDto.content,
        post.postId,
      );
    }

    return await this.postRepository.save(post);
  }

  async deletePost(postId: number) {
    const post = await this.postRepository.findOne({
      where: { postId: Number(postId) },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    return this.postRepository.remove(post);
  }
}
