import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'username cannot be empty' })
  username: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'password cannot be empty' })
  password: string;
}
