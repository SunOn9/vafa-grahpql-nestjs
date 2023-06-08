import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
