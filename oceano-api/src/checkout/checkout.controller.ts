import { Controller, UseGuards, Request, Post, Body, Get } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderDto } from './dto/order.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/role.decorator';
import { Roles } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) { }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 401,
                },
                message: {
                    type: 'string',
                    example: 'Unauthorized',
                }
            }
        }
    })
    @ApiCreatedResponse({
        status: 201,
        description: 'Returns the updated user balance after a sucessful purchase',
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'cc6ea66f-f031-4895-bac3-25a812a5e5e7',
                },
                name: {
                    type: 'string',
                    example: 'User Name',
                },
                email: {
                    type: 'string',
                    example: 'johndoe@mail.com'
                },
                roles: {
                    type: 'array',
                    items: {
                        type: 'string',
                        example: 'USER',
                    }
                },
                balance: {
                    type: 'number',
                    example: 900,
                }
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Not enough balance',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 400,
                },
                message: {
                    type: 'string',
                    example: 'Insufficient funds!',
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Post('/buy')
    createOrder(@Request() req, @Body() data: OrderDto) {
        return this.checkoutService.createOrder(req.user.id, data)
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 401,
                },
                message: {
                    type: 'string',
                    example: 'Unauthorized',
                }
            }
        }
    })
    @ApiOkResponse({
        description: 'Returns a vector with all orders from the active user',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: 'e1b01671-4fba-49be-bcdc-0e6f63ea710e',
                    },
                    userId: {
                        type: 'string',
                        example: 'cc6ea66f-f031-4895-bac3-25a812a5e5e7',
                    },
                    productId: {
                        type: 'string',
                        example: '09523ec8-12d0-4f47-904a-0bd384af26be',
                    },
                    quantity: {
                        type: 'number',
                        example: 1,
                    },
                    createdAt: {
                        type: 'string',
                        example: '2021-08-31T20:00:00.000Z',
                    },
                    updatedAt: {
                        type: 'string',
                        example: '2021-08-31T20:00:00.000Z',
                    },
                }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get('/my-orders')
    getOrders(@Request() req) {
        return this.checkoutService.findAllOrdersByUser(req.user.id)
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials: Only admins can see all orders',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 401,
                },
                message: {
                    type: 'string',
                    example: 'Unauthorized',
                }
            }
        }
    })
    @ApiOkResponse({
        description: 'Returns a vector with all orders',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: 'e1b01671-4fba-49be-bcdc-0e6f63ea710e',
                    },
                    userId: {
                        type: 'string',
                        example: 'cc6ea66f-f031-4895-bac3-25a812a5e5e7',
                    },
                    productId: {
                        type: 'string',
                        example: '09523ec8-12d0-4f47-904a-0bd384af26be',
                    },
                    quantity: {
                        type: 'number',
                        example: 1,
                    },
                    createdAt: {
                        type: 'string',
                        example: '2021-08-31T20:00:00.000Z',
                    },
                    updatedAt: {
                        type: 'string',
                        example: '2021-08-31T20:00:00.000Z',
                    },
                }
            }
        }
    })
    @UseGuards(RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    @Get('/all-orders')
    getAllOrders() {
        return this.checkoutService.findAllOrders()
    }

}
