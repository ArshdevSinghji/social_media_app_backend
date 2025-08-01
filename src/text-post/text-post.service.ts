import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TextPost } from './entities/text-post.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateTextPostDto } from './dto/create-text-post.dto';

@Injectable()
export class TextPostService {
  constructor(
    @InjectRepository(TextPost)
    private textPostRepository: Repository<TextPost>,
  ) {}

  async createTextPost(createTextPost: CreateTextPostDto) {
    const textPost = this.textPostRepository.create({ ...createTextPost });
    return await this.textPostRepository.save(textPost);
  }
}
