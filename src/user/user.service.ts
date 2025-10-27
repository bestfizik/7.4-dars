import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../shared/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthEntity } from '../shared/entities/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(AuthEntity) private authRepo: Repository<AuthEntity>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find({ relations: ['auth'] });
  }

  async findOne(id: number) {
    const u = await this.userRepo.findOne({ where: { id }, relations: ['auth'] });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async update(id: number, dto: UpdateUserDto) {
    const u = await this.findOne(id);
    Object.assign(u, dto);
    return this.userRepo.save(u);
  }

  async remove(id: number) {
    const u = await this.findOne(id);
    await this.userRepo.remove(u);
    return { message: 'User removed' };
  }
}
