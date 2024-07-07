import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor ( public readonly prismaService: PrismaService ) {}

    async createProduct ( data: CreateProductDto ) {
        const product = await this.prismaService.product.create({
            data: {
                name: data.name,
                fixedprice: data.fixedprice,
                price: data.price,
                description: data.description,
                image: data.image,
                stock: data.stock,
            },
        });
        return product;
    }

    async updateProduct (data: UpdateProductDto ) {

        const productExists = await this.prismaService.product.findUnique({
            where: {
                id: data.id,
            },
        });

        if(!productExists) {
            throw new NotFoundException(`Unable to find product with id: ${data.id}`);
        }
        
        const product = await this.prismaService.product.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                fixedprice: data.fixedprice,
                price: data.price,
                description: data.description,
                image: data.image,
                stock: data.stock,
            },
        });
        return product;
    }

    async getAllProducts (): Promise<ProductDto[]> {
        const products = await this.prismaService.product.findMany();
        if(!products) {
            throw new NotFoundException(`Unable to find any product!`);
        }
        return products;
    }

    async fullTextSearch ( query: string ): Promise<ProductDto[]> {
        const products = await this.prismaService.product.findMany({
            where: {
                OR: [
                    { id : { contains: query } },
                    { name: { contains: query , mode: 'insensitive'} },
                    { description: { contains: query , mode: 'insensitive'} },
                ],
            },
        });
        if(products.length === 0) {
            throw new NotFoundException(`Unable to find products with the provided parameters!`);
        }
        return products;
    }

}
