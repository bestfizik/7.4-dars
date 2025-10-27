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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../shared/entities/user.entity");
const auth_entity_1 = require("../shared/entities/auth.entity");
let UserService = class UserService {
    constructor(userRepo, authRepo) {
        this.userRepo = userRepo;
        this.authRepo = authRepo;
    }
    create(dto) {
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    }
    findAll() {
        return this.userRepo.find({ relations: ['auth'] });
    }
    async findOne(id) {
        const u = await this.userRepo.findOne({ where: { id }, relations: ['auth'] });
        if (!u)
            throw new common_1.NotFoundException('User not found');
        return u;
    }
    async update(id, dto) {
        const u = await this.findOne(id);
        Object.assign(u, dto);
        return this.userRepo.save(u);
    }
    async remove(id) {
        const u = await this.findOne(id);
        await this.userRepo.remove(u);
        return { message: 'User removed' };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_entity_1.AuthEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map