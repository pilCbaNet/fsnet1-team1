import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'username cannot be empty' })
  username: string;
  @IsNotEmpty({ message: 'password cannot be empty' })
  password: string;
}
