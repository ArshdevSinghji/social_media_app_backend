import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuotePostDto {
  @IsString()
  @IsNotEmpty()
  quote: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  postId: number;
}
