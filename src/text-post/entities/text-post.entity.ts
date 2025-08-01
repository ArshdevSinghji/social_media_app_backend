import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TextPost {
  @PrimaryGeneratedColumn()
  textPostId: number;

  @Column()
  content: string;

  @Column()
  postId: number;
}
