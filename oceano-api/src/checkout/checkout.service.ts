import { Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlockchainService } from '../blockchain/services/blockchain.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class CheckoutService {
    constructor ( 
        public readonly prismaService: PrismaService,
        private readonly blockchainService: BlockchainService, ) {}

    async createOrder ( id: string, data: OrderDto ) {
        // OrderDto has a UserDto and ProductDto[] as properties
        // This method should:
        // 1. Sum the total price of the order by adding up the prices of all products (multiplying by productsTotals for each product)
        // 2. Check if the user has enough balance to pay for the order
        // 3. If the user has enough balance, subtract the order price from the user's balance
        // 4. If the user balance has been updated, substract from Product.stock the amount of products bought

        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });

        if(!user) {
            throw new NotFoundException(`Unable to find user!`);
        }
        
        let orderPrice = 0;

        if(data.productsIds.length !== data.productsTotals.length) {
            throw new BadRequestException(`Invalid order!`);
        }

        for(let i = 0; i < data.productsIds.length; i++) {
            const product = await this.prismaService.product.findUnique({
                where: {
                    id: data.productsIds[i],
                },
            });

            if(!product) {
                throw new NotFoundException(`Unable to find one or more products!`);
            }

            if(product.stock < data.productsTotals[i]) {
                throw new BadRequestException(`Insufficient stock!`);
            }

            orderPrice += product.price * data.productsTotals[i];
        }

        if(user.balance < orderPrice) {
            throw new BadRequestException(`Insufficient funds!`);
        }

        const { password, pkey, ewallet, ...updatedUser} = await this.prismaService.user.update({
            where: {
                id: id,
            },
            data: {
                balance: user.balance - orderPrice,
            },
        });

        if(!updatedUser) {
            throw new BadRequestException(`Unable to update user balance!`);
        }

        for(let i = 0; i < data.productsIds.length; i++) {

            const product = await this.prismaService.product.findUnique({
                where: {
                    id: data.productsIds[i],
                },
            });

            const updatedProduct = await this.prismaService.product.update({
                where: {
                    id: data.productsIds[i],
                },
                data: {
                    stock: product.stock - data.productsTotals[i],
                },
            });

            if(!updatedProduct) {
                throw new BadRequestException(`Unable to update product stock!`);
            }
        }

        const { wallet, BalanceHub, Sal } = await this.blockchainService.initializeOpetator();

        // do a withdrawFromHub and if it fails, we should revert the changes made to the database

        try {
            await this.blockchainService.withdrawFromHub(wallet, BalanceHub, orderPrice, user.ewallet);
        } catch (error) {
            
            for(let i = 0; i < data.productsIds.length; i++) {
                    
                    const product = await this.prismaService.product.findUnique({
                        where: {
                            id: data.productsIds[i],
                        },
                    });
        
                    const updatedProduct = await this.prismaService.product.update({
                        where: {
                            id: data.productsIds[i],
                        },
                        data: {
                            stock: product.stock + data.productsTotals[i],
                        },
                    });
        
                    if(!updatedProduct) {
                        throw new BadRequestException(`Unable to update product stock!`);
                    }

                    const { password, pkey, ewallet, ...updatedUser} = await this.prismaService.user.update({
                        where: {
                            id: id,
                        },
                        data: {
                            balance: user.balance + orderPrice,
                        },
                    });
            }

            throw new BadRequestException(`Unable to withdraw from hub!`);
        }

        // Create order object on the database
        for(let i = 0; i < data.productsIds.length; i++) {

            try{ 
            await this.prismaService.order.create({
                data: {
                    userId: user.id,
                    productId: data.productsIds[i],
                    quantity: data.productsTotals[i],
                },
            });
            } catch (error) {
                throw new BadRequestException(`Unable to create order object in the database!`);
            }
        }

        return updatedUser;
    }

    async findAllOrdersByUser ( id: string ) {
            
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: id,
                },
            });
    
            if(!user) {
                throw new NotFoundException(`Unable to find user!`);
            }
    
            const orders = await this.prismaService.order.findMany({
                where: {
                    userId: id,
                },
            });
    
            if(!orders) {
                throw new NotFoundException(`Unable to find orders!`);
            }
    
            return orders;
        }

    async findAllOrders () {

        const orders = await this.prismaService.order.findMany();

        if(!orders) {
            throw new NotFoundException(`Unable to find orders!`);
        }

        return orders;
    }
}
