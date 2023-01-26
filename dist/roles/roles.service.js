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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_model_1 = require("./roles.model");
const sequelize_1 = require("@nestjs/sequelize");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let RolesService = class RolesService {
    constructor(roleRepository, logger) {
        this.roleRepository = roleRepository;
        this.logger = logger;
    }
    async createRole(dto) {
        try {
            const role = await this.roleRepository.create(dto);
            if (role) {
                return role;
            }
            throw new common_1.HttpException('Не вдалося створити роль', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
    async getRoleByValue(value) {
        try {
            const role = await this.roleRepository.findOne({ where: { value } });
            if (role) {
                return role;
            }
            throw new common_1.HttpException('Не вдалося знайти роль', common_1.HttpStatus.NOT_FOUND);
        }
        catch (e) {
            this.logger.error(e.stack);
        }
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(roles_model_1.Role)),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [Object, winston_1.Logger])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map