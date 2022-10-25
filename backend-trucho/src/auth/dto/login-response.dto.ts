import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  clientId: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
}
