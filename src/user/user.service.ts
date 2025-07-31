import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.findUserByEmail(createUserDto.email);
    if (existingUser) {
      return existingUser;
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserPosts(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
      relations: ['posts'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user.posts;
  }
}
