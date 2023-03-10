import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'winston';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly logger;
    constructor(userService: UsersService, jwtService: JwtService, logger: Logger);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
}
