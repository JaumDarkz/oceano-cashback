import { Roles } from '@prisma/client';

export class UserDto {
  id: string;
  name: string;
  email: string;
  password?: string;
  roles: Roles[];
  ewallet: string;
  balance: number;
}
