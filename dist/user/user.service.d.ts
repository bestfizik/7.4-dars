import { Repository } from 'typeorm';
import { UserEntity } from '../shared/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthEntity } from '../shared/entities/auth.entity';
export declare class UserService {
    private userRepo;
    private authRepo;
    constructor(userRepo: Repository<UserEntity>, authRepo: Repository<AuthEntity>);
    create(dto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    update(id: number, dto: UpdateUserDto): Promise<UserEntity>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
