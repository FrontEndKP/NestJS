import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles";


interface RoleCreationAttrs {
    value: string;
    description:string;
}
@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Унікальна роль користувача'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Адміністратор', description: 'Опис ролі'})
    @Column({type: DataType.STRING, allowNull: false})
    description:string;

    @BelongsToMany(() => User, () => UserRoles)
    users:User[];
}