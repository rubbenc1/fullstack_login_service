import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/database/models/users/user.repository';
import { CreateUserDto } from './dtos/create_user.dto';
import { UserResponseDto } from './dtos/user_response.dto';
import { hashData } from 'src/common/utils/password-hashing.util.';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update_user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async createUser(createUser: CreateUserDto): Promise<UserResponseDto> {
        const existingUserEmail = await this.userRepository.getUserByEmail(createUser.email);
        if (existingUserEmail) {
            throw new ConflictException('A user with such email already exists');
        }
        const existingUserUsername = await this.userRepository.getUserByUsername(createUser.username);
        if (existingUserUsername) {
            throw new ConflictException('A user with such username already exists');
        }
        const hashedPassword = await hashData(createUser.password);
        const user = await this.userRepository.createUser({
            password: hashedPassword,
            email: createUser.email,
            username: createUser.username
        })
        return plainToInstance(UserResponseDto, {
            id: user.id,
            email: user.email,
        })
    }
    async validateUser(loginUser: LoginUserDto): Promise<UserResponseDto | null>{
        const user = await this.userRepository.getUserByEmail(loginUser.email);
        if(!user){
            return null;
        }
        const passwordMatch = await bcrypt.compare(loginUser.password, user.password);
        if (!passwordMatch) {
            return null;
        }
        return plainToInstance(UserResponseDto, {
            id: user.id
        })
    }
    async findUserById(id: string): Promise<UserResponseDto>{
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return plainToInstance(UserResponseDto, {
            id: user.id,
        })
    }

    async updateUser(id: string, updateUser: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        const updatedUser = await this.userRepository.updateUser(id, updateUser);
      
        return plainToInstance(UserResponseDto, {
          id: updatedUser.id,
        });
    }
    
    async deleteUser(id: string): Promise<void> {
        await this.userRepository.deleteUser(id);
    }


}
