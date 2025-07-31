import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signInUp(signUpDto: SignUpDto) {
    const user = await this.userService.createUser(signUpDto);
    const payload = {
      email: user.email,
      username: user.username,
      userId: user.userId,
    };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
