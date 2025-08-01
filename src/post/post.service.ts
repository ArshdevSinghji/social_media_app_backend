import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UserService } from 'src/user/user.service';
import { PostType } from 'src/enum';
import { PostDto } from './dto/create-post.dto';
import { TextPostService } from 'src/text-post/text-post.service';
import { QuotePostService } from 'src/quote-post/quote-post.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UserService,
    private textPostService: TextPostService,
    private quotePostService: QuotePostService,
  ) {}

  async findPosts(
    orderBy?: string,
    limit?: number,
    page?: number,
    userId?: number,
  ) {
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes');

    if (userId) {
      query.where('user.userId = :userId', { userId });
    }

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

  async createPost(postDto: PostDto) {
    const user = await this.userService.findUserById(postDto.userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { userId, ...postData } = postDto;

    const post = this.postRepository.create({
      ...postData,
      user,
    });

    const savedPost = await this.postRepository.save(post);

    if (post.type === PostType.TEXT && postData.content) {
      await this.textPostService.createTextPost({
        content: postData.content,
        postId: savedPost.postId,
      });
    }

    if (post.type === PostType.QUOTE && postData.quote && postData.author) {
      await this.quotePostService.createQuotePost({
        quote: postData.quote,
        author: postData.author,
        postId: savedPost.postId,
      });
    }

    return savedPost;
  }

  async deletePost(postId: number) {
    const post = await this.postRepository.findOne({
      where: { postId: Number(postId) },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.remove(post);
  }

  async findPostById(postId: number) {
    const post = await this.postRepository.findOne({
      where: { postId: Number(postId) },
      relations: ['user', 'likes'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
