import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'Pranaav@gmail.com', description: 'Email' })
  @IsString({ message: 'Некорректний ввід ' })
  @IsEmail({}, { message: 'Некорретний email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  @IsString({ message: 'Некорректний ввід ' })
  @Length(6, 20, { message: 'Не менше 6 і не більше 20 символі' })
  readonly oldPassword: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  @IsString({ message: 'Некорректний ввід ' })
  @Length(6, 20, { message: 'Не менше 6 і не більше 20 символі' })
  readonly newPassword: string;
}
