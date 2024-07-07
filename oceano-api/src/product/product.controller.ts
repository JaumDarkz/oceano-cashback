import { UseGuards, Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesDecorator } from 'src/decorators/role.decorator';
import { Roles } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor ( private readonly productService: ProductService ) {}

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials: Only admins can create products',
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
        description: 'Returns the created product',
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'ec3c6653-3f6c-4f0a-9965-cab6ad0967e2',
                },
                name: {
                    type: 'string',
                    example: 'Product Name',
                },
                fixedPrice: {
                    type: 'boolean',
                    example: true, 
                },
                price: {
                    type: 'number',
                    example: 1000,
                },
                description: {
                    type: 'string',
                    example: 'Product description',
                },
                image: {
                    type: 'string',
                    example: 'https://www.example.com/image.png',
                },
                stock: {
                    type: 'number',
                    example: 100,
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
    })
    @UseGuards(RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    @Post('create')
    async createProduct ( @Body() data: CreateProductDto ) {
        return await this.productService.createProduct(data);
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials: Only admins can create products',
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
        description: 'Returns the updated product',
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'ec3c6653-3f6c-4f0a-9965-cab6ad0967e2',
                },
                name: {
                    type: 'string',
                    example: 'Product Name',
                },
                fixedPrice: {
                    type: 'boolean',
                    example: true,
                },
                price: {
                    type: 'number',
                    example: 1000,
                },
                description: {
                    type: 'string',
                    example: 'Product description',
                },
                image: {
                    type: 'string',
                    example: 'https://www.example.com/image.png',
                },
                stock: {
                    type: 'number',
                    example: 100,
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
    })
    @ApiNotFoundResponse({
        description: 'Unable to find product',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 404,
                },
                message: {
                    type: 'string',
                    example: 'Unable to find product with id: ec3c6653-3f6c-4f0a-9965-cab6ad0967e2',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                },
            }
        }
    })
    @UseGuards(RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    @Post('update')
    async updateProduct ( @Body() data: UpdateProductDto ) {
        return await this.productService.updateProduct(data);
    }

    @ApiOkResponse({
        description: 'Returns all products',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: 'ec3c6653-3f6c-4f0a-9965-cab6ad0967e2',
                    },
                    name: {
                        type: 'string',
                        example: 'Product Name',
                    },
                    fixedPrice: {
                        type: 'boolean',
                        example: true,
                    },
                    price: {
                        type: 'number',
                        example: 1000,
                    },
                    description: {
                        type: 'string',
                        example: 'Product description',
                    },
                    image: {
                        type: 'string',
                        example: 'https://www.example.com/image.png',
                    },
                    stock: {
                        type: 'number',
                        example: 100,
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
    @Public()
    @Get('all')
    async getAllProducts () {
        return await this.productService.getAllProducts();
    }

    @ApiOkResponse({
        description: 'Returns all products that match the query',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: 'ec3c6653-3f6c-4f0a-9965-cab6ad0967e2',
                    },
                    name: {
                        type: 'string',
                        example: 'Product Name',
                    },
                    fixedPrice: {
                        type: 'boolean',
                        example: true,
                    },
                    price: {
                        type: 'number',
                        example: 1000,
                    },
                    description: {
                        type: 'string',
                        example: 'Product description',
                    },
                    image: {
                        type: 'string',
                        example: 'https://www.example.com/image.png',
                    },
                    stock: {
                        type: 'number',
                        example: 100,
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
    @ApiNotFoundResponse({
        description: 'Unable to find product',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 404,
                },
                message: {
                    type: 'string',
                    example: 'Unable to find products with the provided parameters!',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                },
            }
        }
    })
    @Public()
    @Get('search/:query')
    async fullTextSearch ( @Param('query') query: string ) {
        return await this.productService.fullTextSearch(query);
    }
}
