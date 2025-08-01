import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signInUp(signUpDto: SignUpDto, response: Response) {
    const user = await this.userService.createUser(signUpDto);
    const payload = {
      email: user.email,
      username: user.username,
      userId: user.userId,
    };
    const token = this.jwtService.sign(payload);

    response.cookie('token', token, {
      secure: false,
    });

    return { user, token };
  }
}
