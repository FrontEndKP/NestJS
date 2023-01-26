import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
interface BookCreationAttrs {
    title: string;
    content: string;
    userId: number;
}
export declare class Book extends Model<Book, BookCreationAttrs> {
    id: number;
    title: string;
    content: string;
    userId: number;
    author: User;
}
export {};
