import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDefined, 
  IsNotEmpty, 
  IsEmail, 
  IsString, 
  Matches 
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'ann@gmail.com', description: 'user email' })
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password123*',
    description: 'user password, at least 8 characters including 1 uppercase letter, 1 number, and 1 special character',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, include at least 1 uppercase letter, 1 number, and 1 special character',
  })
  password: string;

  @ApiProperty({ example: 'grant', description: 'username' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  username: string;
}
