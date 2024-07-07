import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        description: "The name of the product.",
        example: "Product 1",
        required: true
    })
    name: string;
    @ApiProperty({
        description: "Property that indicates wether the product has a fixed price or not. If true, the price property must be set. If false, the price property might be null.",
        example: true,
        required: true
    })
    fixedprice: boolean;
    @ApiProperty({
        description: "The price of the product. This property is required if the fixedprice property is true.",
        example: 250,
        required: false
    })
    price?: number;
    @ApiProperty({
        description: "The description of the product.",
        example: "This is a product description.",
        required: true
    })
    description: string;
    @ApiProperty({
        description: "The image of the product.",
        example: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        required: true
    })
    image: string;
    @ApiProperty({
        description: "The stock of the product.",
        example: 10,
        required: true
    })
    stock: number;
}