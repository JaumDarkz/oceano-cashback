import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CheckoutModule } from './checkout/checkout.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, ProductModule, CheckoutModule, BlockchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
