import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Configuration } from './strategies/keys';


@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.registerAsync({
    useFactory() {
      return {
        secret: Configuration.JWT_SECRET,
        signOptions: {
          expiresIn: 3600,
        }
      }
    }
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
