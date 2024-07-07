import { UseGuards, Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RolesDecorator } from 'src/decorators/role.decorator';
import { Roles } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddBalanceDto } from './dto/add-balance.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBody, ApiBadGatewayResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiCreatedResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }


  @ApiBody({ type: CreateUserDto })
  @ApiBadRequestResponse({
    description: 'User might already exist in the database',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'string',
          example: 'User Already Exists',
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'Account creation has unauthorized properties',
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
    description: 'User has been created',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6f8624d4-3d30-4520-ab8f-6be4301baabe',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'johndoe@mail.com',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            example: 'USER',
          }
        },
        balance: {
          type: 'number',
          example: 0,
        }
      }
    }
  })
  @Public()
  @Post('/register')
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }


  @ApiUnauthorizedResponse({
    description: 'Invalid credentials: This API call is only callable by an ADMIN role user',
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
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Returns all users in the database',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '6f8624d4-3d30-4520-ab8f-6be4301baabe',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'johndoe@mail.com',
          },
          password: {
            type: 'string',
            example: '$2b$10$zS9kwgl6tBe2hm1mtTmiq.MjWiQcQe9BUIc/muaNGimEn.N/NHFKe',
          },
          roles: {
            type: 'array',
            items: {
              type: 'string',
              example: 'USER',
            }
          },
          balance: {
            type: 'number',
            example: 0,
          },
          pkey: {
            type: 'string',
            example: "U2FsdGVkX1/FI5bGB4maz1wA2/TSL8Ok5DxboLufoZ9c7pXxTg1zpjzC5qyNIlZ0QnuLKln1WoC5+qKiWr3eye2DHEDjqVH0OSmqhRZhp6ScZJappO8jWjg2LwGWfq6T"
          },
          ewallet: {
            type: 'string',
            example: '0xb5398899ccf75f2fe4e63b9a2346aa245164401d'
          }
      }
    }
    } 
  })
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN)
  @Get('/getall')
  findAll() {
    return this.userService.findAll();
  }

  @ApiUnauthorizedResponse({
    description: 'Invalid credentials: This API call is only callable by an ADMIN role user',
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
  @ApiBearerAuth()
  @ApiCreatedResponse({
    status: 201,
    description: 'User balance has been updated (Both Database and Blockchain)',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6f8624d4-3d30-4520-ab8f-6be4301baabe',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'johndoe@mail.com',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            example: 'USER',
          }
        },
        balance: {
          type: 'number',
          example: 100,
        }
      }
    }
  })
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN)
  @Post('/addbalance')
  addBalance(@Body() data: AddBalanceDto) {
    return this.userService.addBalance(data);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
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
  @ApiOkResponse({
    status: 200,
    description: 'Returns the user information',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6f8624d4-3d30-4520-ab8f-6be4301baabe',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'johndoe@mail.com',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            example: 'USER',
          }
        },
        balance: {
          type: 'number',
          example: 100,
        },
        ewallet: {
          type: 'string',
          example: '0xb5398899ccf75f2fe4e63b9a2346aa245164401d'
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @Get('/info')
  getInfo(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
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
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid password',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'string',
          example: 'Unable to change password: Old password might be incorrect or database is unavailable.',
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        }
      }
    }
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'User password has been changed',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6f8624d4-3d30-4520-ab8f-6be4301baabe',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'johndoe@mail.com',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            example: 'USER',
          }
        },
        balance: {
          type: 'number',
          example: 100,
        },
        ewallet: {
          type: 'string',
          example: '0xb5398899ccf75f2fe4e63b9a2346aa245164401d'
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changePassword(@Request() req, @Body() data: ChangePasswordDto) {
    return this.userService.changePassword(req.user.id, data);
  }


  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
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
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to update user: Email already exists in the database',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'string',
          example: 'Email already exists in the database',
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        }
      }
    }
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'User information has been updated',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6f8624d4-3d30-4520-ab8f-6be4301baabe',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'johndoe@mail.com',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
            example: 'USER',
          }
        },
        balance: {
          type: 'number',
          example: 100,
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  update(@Request() req, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(req.user.id, data);
  }
}
