import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('/register')
  register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  test() {
    return 'test';
  }
}
