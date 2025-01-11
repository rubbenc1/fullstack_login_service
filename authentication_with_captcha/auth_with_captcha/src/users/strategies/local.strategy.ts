import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { UsersService } from "../users.service";
import { UserResponseDto } from "../dtos/user_response.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usersService: UsersService
    ){
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string): Promise<UserResponseDto>{
        const user = await this.usersService.validateUser({ email, password});

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}