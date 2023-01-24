import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Role } from '../roles/roles.model';
import { Book } from './books.model';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [SequelizeModule.forFeature([User, Book])],
})
export class BooksModule {}
