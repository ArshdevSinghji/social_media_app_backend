import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PostType } from 'src/enum';

export class PostDto {
  @IsEnum(PostType)
  type: PostType;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  quote?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  userId: number;
}
