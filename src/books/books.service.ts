import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';
import { BooksController } from './books.controller';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private bookRepository: typeof Book) {}

  async create(dto: CreateBookDto) {
    const book = await this.bookRepository.create(dto);
    return book;
  }
}
