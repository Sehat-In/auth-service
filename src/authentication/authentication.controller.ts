import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from './dto';

@Controller('api/v1/auth')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) {}
    
    @Get('login-google/callback')
    @UseGuards(AuthGuard('google'))
    async loginGoogleRedirect(@Req() request) {
        return this.authService.callbackGoogle(request);
    }

    @Get('login-google')
    @UseGuards(AuthGuard('google'))
    async loginGoogle() {}

    @Post('login')
    async login(@Body() request: UserRequest) {
        return this.authService.login(request);
    }

    @Post('register')
    async register(@Body() request: UserRequest) {
        return this.authService.register(request);
    }

    @Get('refresh')
    @UseGuards(AuthGuard('jwt'))
    async refresh(@Req() request) {
        return this.authService.refresh(request.user);
    }
}
