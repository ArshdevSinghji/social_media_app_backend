import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TextPostService } from './text-post.service';
import { CreateTextPostDto } from './dto/create-text-post.dto';
import { UpdateTextPostDto } from './dto/update-text-post.dto';

@Controller('text-post')
export class TextPostController {
  constructor(private readonly textPostService: TextPostService) {}
}
