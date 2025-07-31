import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TextPost } from './entities/text-post.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class TextPostService {
  constructor(
    @InjectRepository(TextPost)
    private textPostRepository: Repository<TextPost>,
  ) {}

  async createTextPost(content: string, postId: number) {
    const textPost = this.textPostRepository.create({ content, postId });
    return await this.textPostRepository.save(textPost);
  }
}
