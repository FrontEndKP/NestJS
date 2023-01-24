import { BooksController } from '../books.controller';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Кобзар', description: 'Назва книги' })
  @IsString({ message: 'Некорректний ввід ' })
  readonly title: string;

  @ApiProperty({
    example:
      'Видання укладене за сприяння Інституту літератури імені Т. Г. Шевченка.\n' +
      'Тексти творів подані за оригіналами рукописів, що дозволило усунути неточності, допущені в інших виданнях.\n' +
      'Збірка містить найвідоміші твори та щоденник письменника.\n' +
      '\n',
    description: 'Опис книги',
  })
  @IsString({ message: 'Некорректний ввід ' })
  readonly content: string;

  @ApiProperty({ example: '12456', description: 'ID користувача' })
  @IsNumber()
  readonly userId: number;
}
