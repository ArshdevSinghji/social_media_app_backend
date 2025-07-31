import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotePostDto } from './create-quote-post.dto';

export class UpdateQuotePostDto extends PartialType(CreateQuotePostDto) {}
