import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Main')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: 'Returns the status of the server',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          example: 200,
        },
        message: {
          type: 'string',
          example: 'API Online',
        },
      },
    },
  })
  @Public()
  @Get()
  isOnline() {
    return this.appService.isOnline();
  }

  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndoe@mail.com'
        },
        password: {
          type: 'string',
          example: 'password123'
        }
      }
    }
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Returns the JWT token', 
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjQzMjRlOS1mOWVhLTQ4YjQtODg5Zi0yMjIzZjk2ZDYxNWIiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwibmFtZSI6Ik1yLiBBZG1pbmlzdHJhdG9yIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNjkxMzY1ODA0LCJleHAiOjE2OTE0NTIyMDR9.ked_M4jGy96df1K8wI6j81pzXJVuZl41YGfc_vivhsQ'
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 401
        },
        message: {
          type: 'string',
          example: 'Unauthorized'
        }
      }
    }
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404
        },
        message: {
          type: 'string',
          example: 'Target user not found in the database',
        },
        error: {
          type: 'string',
          example: 'Not Found'
        }
      }
    }
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
