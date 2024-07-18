// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log("within login controlled")
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    // Here you can generate and return a JWT token if needed
    return user;
  }
}
