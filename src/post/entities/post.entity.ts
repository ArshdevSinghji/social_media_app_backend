import { PostType } from 'src/enum';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ type: 'enum', enum: PostType })
  type: PostType;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
