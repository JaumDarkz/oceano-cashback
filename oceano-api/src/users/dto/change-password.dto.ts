import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({
        description: "The user's old password. This password is required to ensure the actual user is making the change.",
        example: "password123",
        required: true
    })
    oldPassword: string;
    @ApiProperty({
        description: "The user's new password that will replace the old one.",
        example: "password1234",
        required: true
    })
    newPassword: string;
}