import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequest {
    @ApiProperty({
        description: 'the request username',
    })
    username: string;

    @ApiProperty({
        description: 'the request password',
    })
    @IsNotEmpty()
    password: string;
}