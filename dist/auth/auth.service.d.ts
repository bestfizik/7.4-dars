import { Repository } from 'typeorm';
import { AuthEntity } from '../shared/entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../shared/entities/user.entity';
export declare class AuthService {
    private authRepo;
    private userRepo;
    private jwtService;
    constructor(authRepo: Repository<AuthEntity>, userRepo: Repository<UserEntity>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<any>;
    validateUser(email: string, password: string): Promise<any>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: string;
        };
    }>;
    findById(id: number): Promise<AuthEntity>;
}
