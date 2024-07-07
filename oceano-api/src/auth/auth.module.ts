import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { WalletService } from './services/eth-wallet.service';
require('dotenv').config();

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.MASTER_KEY,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [
    AuthService,
    PasswordService,
    WalletService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService, PasswordService, WalletService],
})
export class AuthModule {}
