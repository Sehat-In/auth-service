import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { GoogleStrategy } from './strategy';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma';
import { JwtStrategy } from './strategy';

@Module({
  imports: [HttpModule, JwtModule.register({secret: process.env.JWT_SECRET}), PrismaModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, GoogleStrategy, JwtStrategy]
})
export class AuthenticationModule {}
