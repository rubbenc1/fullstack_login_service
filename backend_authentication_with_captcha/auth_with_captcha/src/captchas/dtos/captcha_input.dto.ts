import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsEmail, IsString, IsEnum } from 'class-validator';

export class CaptchaInputDto {

    @ApiProperty({ example: 'd8b09d3e-7cb3-4d5e-8ea8-bf2edc3d558b', description: 'Captcha ID' })
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    id: string;

    @ApiProperty({example: 'Ce5r6g', description: 'captcha text'})
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    input: string
}
