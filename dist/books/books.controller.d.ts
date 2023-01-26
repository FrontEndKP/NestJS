import { CreateBookDto } from './dto/create-Book.dto';
import { BooksService } from './books.service';
export declare class BooksController {
    private bookService;
    constructor(bookService: BooksService);
    createBook(dto: CreateBookDto): Promise<import("./books.model").Book>;
}
