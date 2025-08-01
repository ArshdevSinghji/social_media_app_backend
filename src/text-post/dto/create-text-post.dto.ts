import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTextPostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  postId: number;
}
