import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuotePostService } from './quote-post.service';
import { CreateQuotePostDto } from './dto/create-quote-post.dto';
import { UpdateQuotePostDto } from './dto/update-quote-post.dto';

@Controller('quote-post')
export class QuotePostController {
  constructor(private readonly quotePostService: QuotePostService) {}
}
