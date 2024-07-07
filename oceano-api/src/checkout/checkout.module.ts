import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CheckoutController } from './checkout.controller';
import { BlockchainModule } from 'src/blockchain/blockchain.module';

@Module({
  imports: [PrismaModule, BlockchainModule],
  providers: [CheckoutService],
  exports: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
