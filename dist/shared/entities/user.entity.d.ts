import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { AuthEntity } from './auth.entity';
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    articles: ArticleEntity[];
    comments: CommentEntity[];
    auth: AuthEntity;
}
