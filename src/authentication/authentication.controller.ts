import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from './dto';
import { AuthResponse, RefreshResponse } from './dto/user.response';

@Controller('api/v1/auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Get('login-google/callback')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  async loginGoogleRedirect(@Req() request, @Res() response) {
    await this.authService.callbackGoogle(request, response);
  }

  @Get('login-google')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  async loginGoogle() {}

  @Post('login')
  @ApiCreatedResponse({type: AuthResponse})
  @ApiUnauthorizedResponse({description: 'Unauthorized!'})
  async login(@Body() request: UserRequest) {
    return await this.authService.login(request);
  }

  @Post('register')
  @ApiCreatedResponse({type: AuthResponse})
  @ApiUnauthorizedResponse({description: 'Username has been taken!'})
  async register(@Body() request: UserRequest) {
    return await this.authService.register(request);
  }

  @Get('refresh')
  @ApiCreatedResponse({type: RefreshResponse})
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer',
  })
  @UseGuards(AuthGuard('jwt'))
  async refresh(@Req() request) {
    return await this.authService.refresh(request.user);
  }

  @Get('get-data-from-token')
  @ApiCreatedResponse({type: AuthResponse})
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer',
  })
  @UseGuards(AuthGuard('jwt'))
  async getDataFromToken(@Req() request){
    return await this.authService.getDataFromToken(request.user);
  }
}
