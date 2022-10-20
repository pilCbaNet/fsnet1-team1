import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto): Promise<LoginResponseDto> {
    userDto.username = userDto.username.toLowerCase();
    const { username, password } = userDto;

    const u = await this.userRepository.findOne({
      where: { username },
    });

    if (u && (await compare(password, u.password))) {
      const payload = { id: u.id, username: u.username };

      const token = this.jwtService.sign(payload);
      const response = {
        username,
        token,
      };

      return response;
    }

    throw new HttpException('Username or password is incorrect', 400);
  }

  async register(userDto: UserDto) {
    userDto.username = userDto.username.toLowerCase();
    const { username, password } = userDto;

    const u = await this.userRepository.findOne({
      where: { username },
    });

    if (u) {
      throw new HttpException('Username is already in use', 400);
    }

    const hashedPassword = await hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
    };

    return this.userRepository.save(newUser);
  }
}
