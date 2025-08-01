import { IsInt } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  postId: number;

  @IsInt()
  userId: number;
}
