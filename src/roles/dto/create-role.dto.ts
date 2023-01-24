import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'АDMIN', description: 'Назва ролі' })
  @IsString({ message: 'Некорректний ввід ' })
  readonly value: string;

  @ApiProperty({ example: 'Адміністратор', description: 'Опис ролі' })
  @Length(0, 100, { message: 'Не більше 100 символів' })
  @IsString({ message: 'Некорректний ввід ' })
  readonly description: string;
}
