import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../shared/entities/auth.entity';
import { UserEntity } from '../shared/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from '../shared/guards/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? "24h") as any },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
