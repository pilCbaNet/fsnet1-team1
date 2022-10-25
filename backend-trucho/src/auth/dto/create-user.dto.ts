import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends PartialType(UserDto) {
  @ApiProperty()
  @IsNotEmpty({ message: 'name cannot be empty' })
  name: string;
}
