import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-Book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }
}
