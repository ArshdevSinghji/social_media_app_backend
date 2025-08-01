import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @UseGuards(AuthGuard)
  // @Get('/posts')
  // async getUserPosts(@Req() req: any) {
  //   const userId = req.user.userId;
  //   return this.userService.getUserPosts(userId);
  // }
}
