import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AddRoleDto } from './dto/add-role.dto';
import { ChangePasswordDto } from './dto/change-password dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    getByValue(value: string): Promise<User>;
    getById(id: number): Promise<User>;
    removeById(id: number): Promise<void>;
    updateById(id: number, password: string, userDto: CreateUserDto, req: any): Promise<{
        updatedUser: number;
    }>;
    updateByEmail(dto: ChangePasswordDto, req: any): Promise<any>;
    setRole(userDto: AddRoleDto): Promise<AddRoleDto | {
        message: any;
    }>;
}
