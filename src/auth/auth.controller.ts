import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signInUp')
  async signInUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signInUp(signUpDto);
  }
}
