import { IsNotEmpty } from 'class-validator';

export class UserRequest {
    username: string;

    @IsNotEmpty()
    password: string;
}