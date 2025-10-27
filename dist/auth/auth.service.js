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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_entity_1 = require("../shared/entities/auth.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../shared/entities/user.entity");
let AuthService = class AuthService {
    constructor(authRepo, userRepo, jwtService) {
        this.authRepo = authRepo;
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const exists = await this.authRepo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.BadRequestException('Email already exists');
        const hashed = await bcrypt.hash(dto.password, 10);
        const auth = this.authRepo.create({
            username: dto.username,
            email: dto.email,
            password: hashed,
            role: dto.role || 'user',
        });
        const savedAuth = await this.authRepo.save(auth);
        const profile = this.userRepo.create({
            auth: savedAuth,
            fullName: dto.username,
        });
        await this.userRepo.save(profile);
        const { password, ...rest } = savedAuth;
        return rest;
    }
    async validateUser(email, password) {
        const user = await this.authRepo.findOne({ where: { email } });
        if (!user)
            return null;
        const matched = await bcrypt.compare(password, user.password);
        if (!matched)
            return null;
        const { password: pw, ...rest } = user;
        return rest;
    }
    async login(dto) {
        const user = await this.authRepo.findOne({ where: { email: dto.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const matched = await bcrypt.compare(dto.password, user.password);
        if (!matched)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return { access_token: token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
    }
    async findById(id) {
        return this.authRepo.findOne({ where: { id }, select: ['id', 'username', 'email', 'role'] });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.AuthEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map