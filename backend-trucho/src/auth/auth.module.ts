import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { clientProviders } from 'src/client/client.providers';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [...userProviders, ...clientProviders, AuthService, JwtStrategy],
})
export class AuthModule {}
