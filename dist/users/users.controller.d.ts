import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AddRoleDto } from './dto/add-role.dto';
import { ChangePasswordDto } from './dto/change-password dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto): Promise<User>;
    getAll(): Promise<any>;
    getByValue(value: string): Promise<any>;
    getById(id: number): Promise<any>;
    removeById(id: number): Promise<any>;
    updateById(id: number, password: string, userDto: CreateUserDto, req: any): Promise<any>;
    updateByEmail(dto: ChangePasswordDto, req: any): Promise<any>;
    setRole(userDto: AddRoleDto): Promise<any>;
}
