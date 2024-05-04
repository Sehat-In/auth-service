import { HttpException } from "@nestjs/common";

export class CustomUnauthorizedException extends HttpException{
    constructor(){
        super('Unauthorized!', 401)
    }
}

export class UserAlreadyDefinedException extends HttpException{
    constructor(){
        super('Username has been taken!', 400)
    }
}