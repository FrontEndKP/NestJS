import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { Logger } from 'winston';
export declare class RolesService {
    private roleRepository;
    private readonly logger;
    constructor(roleRepository: typeof Role, logger: Logger);
    createRole(dto: CreateRoleDto): Promise<Role>;
    getRoleByValue(value: string): Promise<Role>;
}
