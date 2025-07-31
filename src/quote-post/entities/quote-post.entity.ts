import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QuotePost {
  @PrimaryGeneratedColumn()
  quotePostId: string;

  @Column('text')
  quote: string;

  @Column()
  author: string;
}
