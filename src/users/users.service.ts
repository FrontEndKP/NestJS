import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ChangePasswordDto } from './dto/change-password dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    user.roles = [role];
    await user.$set('roles', [role.id]);
    return user;
  }

  async findAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'Користувача з таким ID не зайдено',
      HttpStatus.NOT_FOUND,
    );
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.ID);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Користувача або роль не знайдено',
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(id: number) {
    const deleted = await this.userRepository.destroy({ where: { id } });
    if (deleted === 0) {
      throw new HttpException('Користувача не знайдено', HttpStatus.NOT_FOUND);
    }
    return 'Успішно видалено користувача';
  }

  async updatePasswordById(id: number, password: string) {
    const hashPassword = await bcrypt.hash(password, 5);
    const [updatedUser] = await this.userRepository.update(
      { password: hashPassword },
      { where: { id }, returning: true },
    );
    return { updatedUser };
  }
}
