import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '../shared/entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../shared/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepo: Repository<AuthEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.authRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const auth = this.authRepo.create({
      username: dto.username,
      email: dto.email,
      password: hashed,
      role: dto.role || 'user',
    });
    const savedAuth = await this.authRepo.save(auth);

    // create profile in user entity (optional)
    const profile = this.userRepo.create({
      auth: savedAuth,
      fullName: dto.username,
    });
    await this.userRepo.save(profile);

    const { password, ...rest } = savedAuth as any;
    return rest;
  }

  async validateUser(email: string, password: string) {
    const user = await this.authRepo.findOne({ where: { email } });
    if (!user) return null;
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return null;
    const { password: pw, ...rest } = user as any;
    return rest;
  }

  async login(dto: LoginDto) {
    const user = await this.authRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const matched = await bcrypt.compare(dto.password, user.password);
    if (!matched) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
  }

  async findById(id: number) {
    return this.authRepo.findOne({ where: { id }, select: ['id', 'username', 'email', 'role'] });
  }
}
