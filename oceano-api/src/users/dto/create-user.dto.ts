import { Roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "The user's name.",
    example: "John Doe",
    required: true
  })
  name: string;
  @ApiProperty({
    description: "The user's email. This property is a unique indentifier required to identify the user in the database.",
    example: "johndoe@mail.com",
    required: true
  })
  email: string;
  @ApiProperty({
    description: "The user's password. This property is required to authenticate the user.",
    example: "password123",
    required: true
  })
  password: string;
  @ApiProperty({
    description: "The user's roles. This property is required to identify the user's permissions. Only an ADMIN user can create a new ADMIN user.",
    example: ["USER"],
    required: false
  })
  roles?: Roles[];
}
