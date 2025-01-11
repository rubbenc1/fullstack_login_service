import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {

    @ApiProperty({example: 'ann@gmail.com', description: 'user email'})
    @IsEmail()
    @IsDefined()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'rary1', description: 'user password'})
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password: string;
}