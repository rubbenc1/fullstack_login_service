import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsEnum, IsString } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({example: 'ann@gmail.com', description: 'user email'})
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({example: 'grant', description: 'username'})
  @IsOptional()
  @IsString()
  username?: string

}
