import { Role } from '../../enums/role.enum';
export declare class RegisterDto {
    username: string;
    email: string;
    password: string;
    role?: Role;
}
