import {BooksController} from "../books.controller";

export class CreateBookDto {
    readonly title: string;
    readonly content: string;
    readonly userId: number;
}
