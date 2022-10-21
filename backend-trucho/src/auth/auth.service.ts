import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import { Client } from 'src/client/entities/client.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('CLIENT_REPOSITORY')
    private clientRepository: Repository<Client>,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto): Promise<LoginResponseDto> {
    userDto.username = userDto.username.toLowerCase();
    const { username, password } = userDto;

    const u = await this.userRepository.findOne({
      relations: { client: true },
      where: { username },
    });

    if (u && (await compare(password, u.password))) {
      const payload = { id: u.id, username: u.username };

      const token = this.jwtService.sign(payload);
      const response = {
        userId: u.id,
        clientId: u.client.id,
        username,
        token,
      };

      return response;
    }

    throw new HttpException('Username or password is incorrect', 400);
  }

  async register(userDto: CreateUserDto) {
    userDto.username = userDto.username.toLowerCase();
    userDto.name = userDto.name.toLowerCase();
    const { username, password, name } = userDto;

    const u = await this.userRepository.findOne({
      where: { username },
    });

    if (u) throw new HttpException('Username is already in use', 400);

    const c = await this.clientRepository.findOne({
      where: { name },
    });

    if (c) throw new HttpException('name is already in use', 400);

    const hashedPassword = await hash(password, 10);

    const client = new Client();
    client.name = name;

    await client.save();

    const newUser = {
      username,
      password: hashedPassword,
      client,
    };

    return this.userRepository.save(newUser);
  }
}
