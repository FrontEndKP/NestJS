"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const roles_service_1 = require("../roles/roles.service");
const bcrypt = require("bcryptjs");
const winston_1 = require("winston");
const nest_winston_1 = require("nest-winston");
let UsersService = class UsersService {
    constructor(userRepository, roleService, logger) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.logger = logger;
    }
    async createUser(dto) {
        try {
            const user = await this.userRepository.create(dto);
            const role = await this.roleService.getRoleByValue('ADMIN');
            user.roles = [role];
            await user.$set('roles', [role.id]);
            if (user) {
                this.logger.info(`New user created: ${user.email}`);
                return user;
            }
            throw new common_1.HttpException('Користувача не створено', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
    async findAllUsers() {
        try {
            const users = await this.userRepository.findAll({
                include: { all: true },
            });
            if (users) {
                this.logger.info(`Found users: ${users}`);
                return users;
            }
            throw new common_1.HttpException('Користувачів не знайдено', common_1.HttpStatus.NOT_FOUND);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
                include: { all: true },
            });
            if (user) {
                this.logger.info(`Found user by email: ${user}`);
                return user;
            }
            throw new common_1.HttpException('Користувача не знайдено', common_1.HttpStatus.NOT_FOUND);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
    async findUserById(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                include: { all: true },
            });
            if (user) {
                this.logger.info(`Found user by id: ${user}`);
                return user;
            }
            throw new common_1.HttpException('Користувача з таким ID не зайдено', common_1.HttpStatus.NOT_FOUND);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
    async addRole(dto) {
        try {
            const user = await this.userRepository.findByPk(dto.ID);
            const role = await this.roleService.getRoleByValue(dto.value);
            if (role && user) {
                await user.$add('role', role.id);
                this.logger.info(`Added role: ${dto.value} to user with ID: ${dto.ID}`);
                return dto;
            }
            throw new common_1.HttpException('Користувача або роль не знайдено', common_1.HttpStatus.NOT_FOUND);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
    async delete(id) {
        try {
            const deleted = await this.userRepository.destroy({ where: { id } });
            if (deleted === 0) {
                throw new common_1.HttpException('Користувача не знайдено', common_1.HttpStatus.NOT_FOUND);
            }
            this.logger.info(`Successfully deleted user`);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
    async updatePasswordById(id, password) {
        try {
            const hashPassword = await bcrypt.hash(password, 5);
            const [updatedUser] = await this.userRepository.update({ password: hashPassword }, { where: { id }, returning: true });
            if (updatedUser) {
                return { updatedUser };
                this.logger.info(`Successfully updated password`);
            }
            throw new common_1.HttpException('Пароль не оновлено', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService,
        winston_1.Logger])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
