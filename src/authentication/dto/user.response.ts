import { ApiProperty } from '@nestjs/swagger';


class Profile {
    @ApiProperty({
        description: 'the response profile id',
    })
    id: number
    @ApiProperty({
        description: 'the response profile userId',
    })
    userId: number
    @ApiProperty({
        description: 'the response profile first name',
    })
    firstName: string
    @ApiProperty({
        description: 'the response profile last name',
    })
    lastName: string
    @ApiProperty({
        description: 'the response profile picture',
    })
    picture: string
}

export class AuthResponse {
    @ApiProperty({
        description: 'the response id',
    })
    id: number

    @ApiProperty({
        description: 'the response username',
    })
    username: string

    @ApiProperty({
        description: 'the response email',
    })
    email: string

    @ApiProperty({
        description: 'the response account type',
    })
    accountType: string

    @ApiProperty({
        description: 'the response profile',
    })
    profile: Profile

    @ApiProperty({
        description: 'the response access token',
    })
    accessToken: string

    @ApiProperty({
        description: 'the response refresh token',
    })
    refreshToken: string
}

export class RefreshResponse {
    @ApiProperty({
        description: 'the response access token',
    })
    accessToken: string
    
    @ApiProperty({
        description: 'the response refresh token',
    })
    refreshToken: string
}