import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';
import { BooksController } from './books.controller';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private bookRepository: typeof Book,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(dto: CreateBookDto) {
    try {
      const book = await this.bookRepository.create(dto);
      if (book) {
        return book;
      }
      throw new HttpException(
        'Не вдалося створити книгу',
        HttpStatus.EXPECTATION_FAILED,
      );
    } catch (e) {
      this.logger.error(e.stack);
    }
  }
}
