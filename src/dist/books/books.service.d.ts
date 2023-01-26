import { CreateBookDto } from './dto/create-Book.dto';
import { Book } from './books.model';
import { Logger } from 'winston';
export declare class BooksService {
    private bookRepository;
    private readonly logger;
    constructor(bookRepository: typeof Book, logger: Logger);
    create(dto: CreateBookDto): Promise<Book>;
}
