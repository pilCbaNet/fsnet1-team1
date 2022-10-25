import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: UserDto): Promise<LoginResponseDto> {
    return this.authService.login(userDto);
  }

  @Post('/register')
  register(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.register(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  test() {
    return 'test';
  }
}
