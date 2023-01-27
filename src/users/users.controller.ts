import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AddRoleDto } from './dto/add-role.dto';
import { Model } from 'sequelize-typescript';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { ChangePasswordDto } from './dto/change-password dto';

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Створення користувача' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Отримання усіх користувачів' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.findAllUsers();
  }

  @ApiOperation({ summary: 'Отримання користувача за email' })
  @ApiResponse({ status: 200, type: User })
  @Get('/m/:email')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getByValue(@Param('email') value: string) {
    return this.userService.findUserByEmail(value);
  }

  @ApiOperation({ summary: 'Отримання користувача за id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/i/:id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @ApiOperation({ summary: 'Видалення користувача за id' })
  @ApiResponse({ status: 200 })
  @Delete('/d/:id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async removeById(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Зміна паролю користувача адміном' })
  @ApiResponse({ status: 200 })
  @Put('/psa/:id/:password')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: number,
    @Param('password') password: string,
    @Body() userDto: CreateUserDto,
    @Request() req,
  ) {
    return this.userService.updatePasswordById(id, password);
  }

  @ApiOperation({ summary: 'Назначити роль' })
  @ApiResponse({ status: 200 })
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}
