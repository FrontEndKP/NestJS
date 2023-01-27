import {
  forwardRef,
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
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.validateUser(userDto.email, userDto.password);
      return this.generateToken(user);
    } catch (e) {
      this.logger.error(e.stack);
      return e.message;
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

  async validateUser(email: string, password: string) {
    //try {
    const user = await this.userService.findUserByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Не вірний email або пароль',
    });
    //} catch (e) {
    //this.logger.error(e.stack);
    //}
  }
}
