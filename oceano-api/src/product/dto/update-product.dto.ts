import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({
        description: "The id of the product. This property is set automatically by the database and follows a UUID (v4) format.",
        example: "09523ec8-12d0-4f47-904a-0bd384af26be",
        required: true
    })
    id: string;
    @ApiProperty({
        description: "The name of the product. If this property is not set, the product name will not be updated.",
        example: "Product 1",
        required: false
    })
    name?: string;
    @ApiProperty({
        description: "Property that indicates wether the product has a fixed price or not. If true, the price property must be set. If false, the price property might be null. If this property is not set, the product fixedprice will not be updated.",
        example: true,
        required: false
    })
    fixedprice?: boolean;
    @ApiProperty({
        description: "The price of the product. This property is required if the fixedprice property is true. If this property is not set, the product price will not be updated.",
        example: 250,
        required: false
    })
    price?: number;
    @ApiProperty({
        description: "The description of the product. If this property is not set, the product description will not be updated.",
        example: "This is a product description.",
        required: false
    })
    description?: string;
    @ApiProperty({
        description: "The image of the product. If this property is not set, the product image will not be updated.",
        example: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        required: false
    })
    image?: string;
    @ApiProperty({
        description: "The stock of the product. If this property is not set, the product stock will not be updated.",
        example: 10,
        required: false
    })
    stock?: number;
}