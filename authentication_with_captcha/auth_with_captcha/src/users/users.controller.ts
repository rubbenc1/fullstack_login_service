import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get_user.decorator';
import { RequestUserFields } from './dtos/request_user_fields.interface';
import { SuccessfulResponseAuthDto } from './dtos/successful_response_auth.dto';

@ApiTags('Users')
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Register user' })
    @ApiResponse({ status: 201, description: 'User successfully registered' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @Post('register')
    async registerUser(@Body() createUser: CreateUserDto): Promise<SuccessfulResponseAuthDto> {
        await this.usersService.createUser(createUser);
        return { message: 'User successfully registered' };
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
    @Post('login')
    @HttpCode(200)
    @UseGuards(AuthGuard('local'))
    async login(@GetUser() user: RequestUserFields): Promise<SuccessfulResponseAuthDto> {
        return { message: 'Successfully authorized' };
    }
}
