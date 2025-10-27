import { AuthEntity } from './auth.entity';
export declare class UserEntity {
    id: number;
    fullName: string;
    bio: string;
    auth: AuthEntity;
}
