import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TextPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  postId: number;
}
