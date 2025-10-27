import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<import("../shared/entities/user.entity").UserEntity[]>;
    getOne(id: string): Promise<import("../shared/entities/user.entity").UserEntity>;
    create(dto: CreateUserDto): Promise<import("../shared/entities/user.entity").UserEntity>;
    update(id: string, dto: UpdateUserDto): Promise<import("../shared/entities/user.entity").UserEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
