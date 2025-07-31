import { PartialType } from '@nestjs/mapped-types';
import { CreateTextPostDto } from './create-text-post.dto';

export class UpdateTextPostDto extends PartialType(CreateTextPostDto) {}
