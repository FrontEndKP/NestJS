import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ChangePasswordDto } from './dto/change-password dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.roleService.getRoleByValue('ADMIN');
      user.roles = [role];
      await user.$set('roles', [role.id]);
      if (user) {
        this.logger.info(`New user created: ${user.email}`);
        return user;
      }
      throw new HttpException(
        'Користувача не створено',
        HttpStatus.EXPECTATION_FAILED,
      );
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async findAllUsers() {
    try {
      const users = await this.userRepository.findAll({
        include: { all: true },
      });
      if (users) {
        this.logger.info(`Found users: ${users}`);
        return users;
      }
      throw new HttpException('Користувачів не знайдено', HttpStatus.NOT_FOUND);
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        include: { all: true },
      });
      if (user) {
        this.logger.info(`Found user by email: ${user}`);
        return user;
      }
      throw new HttpException('Користувача не знайдено', HttpStatus.NOT_FOUND);
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (user) {
        this.logger.info(`Found user by id: ${user}`);
        return user;
      }
      throw new HttpException(
        'Користувача з таким ID не зайдено',
        HttpStatus.NOT_FOUND,
      );
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async addRole(dto: AddRoleDto) {
    try {
      const user = await this.userRepository.findByPk(dto.ID);
      const role = await this.roleService.getRoleByValue(dto.value);
      if (role && user) {
        await user.$add('role', role.id);
        this.logger.info(`Added role: ${dto.value} to user with ID: ${dto.ID}`);
        return dto;
      }
      throw new HttpException(
        'Користувача або роль не знайдено',
        HttpStatus.NOT_FOUND,
      );
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async delete(id: number) {
    try {
      const deleted = await this.userRepository.destroy({ where: { id } });
      if (deleted === 0) {
        throw new HttpException(
          'Користувача не знайдено',
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.info(`Successfully deleted user`);
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async updatePasswordById(id: number, password: string) {
    try {
      const hashPassword = await bcrypt.hash(password, 5);
      const [updatedUser] = await this.userRepository.update(
        { password: hashPassword },
        { where: { id }, returning: true },
      );
      if (updatedUser) {
        return { updatedUser };
        this.logger.info(`Successfully updated password`);
      }
      throw new HttpException(
        'Пароль не оновлено',
        HttpStatus.EXPECTATION_FAILED,
      );
    } catch (e) {
      this.logger.error(e.stack);
    }
  }
}
