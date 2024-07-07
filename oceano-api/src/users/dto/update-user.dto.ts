import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto{
    @ApiProperty({
        description: "The user's name.",
        example: "John Doe",
        required: false
    })
    name?: string;
    @ApiProperty({
        description: "The user's email.",
        example: "johndoe@mail.com",
        required: false
    })
    email?: string;
}