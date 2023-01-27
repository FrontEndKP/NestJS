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
    findAllUsers(): Promise<any>;
    findUserByEmail(email: string): Promise<any>;
    findUserById(id: number): Promise<any>;
    addRole(dto: AddRoleDto): Promise<any>;
    delete(id: number): Promise<any>;
    updatePasswordById(id: number, password: string): Promise<any>;
    updatePasswordByEmail(dto: ChangePasswordDto): Promise<any>;
}
