import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QuotePost {
  @PrimaryGeneratedColumn()
  quotePostId: number;

  @Column('text')
  quote: string;

  @Column()
  author: string;

  @Column()
  postId: number;
}
