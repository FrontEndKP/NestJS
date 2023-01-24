import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async createRole(dto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.create(dto);
      if (role) {
        return role;
      }
      throw new HttpException(
        'Не вдалося створити роль',
        HttpStatus.EXPECTATION_FAILED,
      );
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async getRoleByValue(value: string) {
    try {
      const role = await this.roleRepository.findOne({ where: { value } });
      if (role) {
        return role;
      }
      throw new HttpException('Не вдалося знайти роль', HttpStatus.NOT_FOUND);
    } catch (e) {
      this.logger.error(e.stack);
    }
  }
}
