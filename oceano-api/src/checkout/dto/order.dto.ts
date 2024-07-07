import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
    @ApiProperty({
        description: "A list of the products ids that the user wants to buy. IDs are UUID format (v4) values.",
        example: ["09523ec8-12d0-4f47-904a-0bd384af26be", "c00c36d0-ea94-4b6e-880d-7e27d650573b"],
        required: true
    })
    productsIds: string[];

    @ApiProperty({
        description: "A list of number of the products that the user wants to buy. This list must be in the same order as the productsIds list and should match the productsIds list in size.",
        example: [1, 2],
        required: true
    })
    productsTotals: number[];
}