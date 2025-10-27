import { UserEntity } from './user.entity';
export declare class AuthEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    user: UserEntity;
}
