import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ChangePasswordDto } from './dto/change-password dto';
import { AuthService } from '../auth/auth.service';
import { Logger } from 'winston';
export declare class UsersService {
    private userRepository;
    private roleService;
    private readonly logger;
    private authService;
    constructor(userRepository: typeof User, roleService: RolesService, logger: Logger, authService: AuthService);
    createUser(dto: CreateUserDto): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto | {
        message: any;
    }>;
    delete(id: number): Promise<void>;
    updatePasswordById(id: number, password: string): Promise<{
        updatedUser: number;
    }>;
    updatePasswordByEmail(dto: ChangePasswordDto): Promise<any>;
}
