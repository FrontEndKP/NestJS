import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';
import { Logger } from 'winston';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly logger;
    constructor(userService: UsersService, jwtService: JwtService, logger: Logger);
    login(userDto: CreateUserDto): Promise<any>;
    registration(userDto: CreateUserDto): Promise<any>;
    private generateToken;
    validateUser(email: string, password: string): Promise<User>;
}
