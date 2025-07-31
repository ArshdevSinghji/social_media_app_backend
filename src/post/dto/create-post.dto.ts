import { PostType } from 'src/enum';
import { Column } from 'typeorm';

export class CreatePostDto {
  @Column({ type: 'enum', enum: PostType })
  type: PostType;

  @Column()
  content: string;

  @Column()
  quote: string;

  @Column()
  author: string;
}
