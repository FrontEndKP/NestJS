import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/books.model';
import { WinstonModule } from 'nest-winston';
// eslint-disable-next-line prettier/prettier
import {format, transports} from 'winston';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple(),
      ),
      transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({ filename: 'debug.log', level: 'debug' }),
      ],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: String(process.env.POSTGRES_DB),
      models: [User, Role, UserRoles, Book],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BooksModule,
  ],
})
export class AppModule {}
