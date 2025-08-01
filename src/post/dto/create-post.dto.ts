import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PostType } from 'src/enum';

export class PostDto {
  @IsEnum(PostType)
  type: PostType;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  quote?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsInt()
  userId: number;
}
