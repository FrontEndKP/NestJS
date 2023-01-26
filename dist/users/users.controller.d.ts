import { RawBodyRequest } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto, req: RawBodyRequest<Request>): Promise<User>;
    getAll(): Promise<User[]>;
    getByValue(value: string): Promise<User>;
    getById(id: number): Promise<User>;
    removeById(id: number): Promise<void>;
    update(id: number, password: string, userDto: CreateUserDto, req: any): Promise<{
        updatedUser: number;
    }>;
}
