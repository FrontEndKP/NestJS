"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksModule = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const books_controller_1 = require("./books.controller");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../users/users.model");
const books_model_1 = require("./books.model");
let BooksModule = class BooksModule {
};
BooksModule = __decorate([
    (0, common_1.Module)({
        providers: [books_service_1.BooksService],
        controllers: [books_controller_1.BooksController],
        imports: [sequelize_1.SequelizeModule.forFeature([users_model_1.User, books_model_1.Book])],
    })
], BooksModule);
exports.BooksModule = BooksModule;
//# sourceMappingURL=books.module.js.map