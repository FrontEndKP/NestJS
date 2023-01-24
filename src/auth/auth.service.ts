import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.findUserByEmail(userDto.email);
      if (candidate) {
        throw new HttpException(
          'Користувач з таким email вже існує',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });
      return this.generateToken(user);
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  private async generateToken(user: User) {
    try {
      const payload = { email: user.email, id: user.id, roles: user.roles };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.findUserByEmail(userDto.email);
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException({
        message: 'Не вірний email або пароль',
      });
    } catch (e) {
      this.logger.error(e.stack);
    }
  }
}
