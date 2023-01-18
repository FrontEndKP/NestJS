import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'Pranaav@gmail.com', description: 'Email'})
    readonly email: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль'})
    readonly password: string;
}