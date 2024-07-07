import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
// import { WalletService } from 'src/auth/services/eth-wallet.service';
import { BlockchainModule } from 'src/blockchain/blockchain.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), BlockchainModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
