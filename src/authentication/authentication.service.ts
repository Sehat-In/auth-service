import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomUnauthorizedException, UserAlreadyDefinedException } from 'src/common';
import { PrismaService } from 'src/prisma';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Injectable()
export class AuthenticationService {
    constructor(private jwtService: JwtService,
        private prismaService: PrismaService) { }

    async callbackGoogle(request: any, response: any) {
        if (!request.user) throw new CustomUnauthorizedException();
        let user: any = await this.prismaService.user.findUnique({ where: { email: request.user.email } });
        if (!user) {
            user = await this.registerGoogle(request)
        }

        const profile = await this.prismaService.profile.findUnique({ where: { userId: user.id } });
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            accountType: user.accountType,
            profile: profile
        }
        const result = { ...payload, ...this.generateToken(payload) };
    
        response.redirect(process.env.GOOGLE_REDIRECT_URL + '/login/handler/?key=' + result.accessToken);
    }

    async login(request) {
        const user = await this.prismaService.user.findUnique({ where: { username: request.username } });
        if (!user || !await this.matchPassword(request.password, user.password)) throw new CustomUnauthorizedException();
        const profile = await this.prismaService.profile.findUnique({ where: { userId: user.id } });
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            accountType: user.accountType,
            profile: profile
        }
        const result = { ...payload, ...this.generateToken(payload) };
        return result;
    }

    async register(request: any) {
        if (await this.checkUser(request.username)) throw new UserAlreadyDefinedException();
        const hashedPassword = await bcrypt.hash(request.password, Number(process.env.SALT_ROUNDS));
        const user = await this.prismaService.user.create({
            data: {
                username: request.username,
                password: hashedPassword,
                accountType: 'DEFAULT',
                profile: {
                    create: {}
                }
            }
        });
        const profile = await this.prismaService.profile.findUnique({ where: { userId: user.id } });
        return { id: user.id, username: user.username, email: user.email, accountType: user.accountType, profile: profile };
    }

    async registerGoogle(request: any) {
        const user = await this.prismaService.user.create({
            data: {
                username: request.user.email,
                email: request.user.email,
                accountType: 'GOOGLE',
                profile: {
                    create: {
                        firstName: request.user.firstName,
                        lastName: request.user.lastName,
                        picture: request.user.picture
                    }
                }
            }
        });
        const profile = await this.prismaService.profile.findUnique({ where: { userId: user.id } });
        return { id: user.id, username: user.username, email: user.email, accountType: user.accountType, profile: profile };
    }

    async getDataFromToken(payload:any) {
        const data = {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            accountType: payload.accountType,
            profile: payload.profile,
        }
        return {...data, ...this.generateToken(data)}
    }

    async refresh(payload: any) {
        return this.generateToken({
            id: payload.id,
            username: payload.username,
            email: payload.email,
            accountType: payload.accountType,
            profile: payload.profile
        });
    }

    async checkUser(username: string) {
        return await this.prismaService.user.findUnique({ where: { username: username } }) ? true : false;
    }

    async matchPassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateToken(payload: any) {
        const token = {
            accessToken: this.jwtService.sign(payload, { expiresIn: '60s' }),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' })
        };
        return token;
    }
}
