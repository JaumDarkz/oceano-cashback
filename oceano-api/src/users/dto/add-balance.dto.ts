import { ApiProperty } from '@nestjs/swagger';

export class AddBalanceDto {
  @ApiProperty({
    description: "The user's email. This property is required to identify the user.",
    example: "johndoe@mail.com",
    required: true
  })
  email: string;
  @ApiProperty({
    description: "The amount of money to add to the user's balance. This balance will be added to both the user database information and to the blockchain in form of ERC20-compliant SAL tokens.",
    example: 100,
    required: true
  })
  amount: number;
}