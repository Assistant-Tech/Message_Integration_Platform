import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) { }

  @Post('signup')
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'user created successfully',
  })
  async signup(@Body() UserPayload: any) {

    const response = UserPayload
    const accessToken = this.jwtService.sign({ UserPayload }, { expiresIn: '1h' });
    return { response, accessToken };
  }

}
