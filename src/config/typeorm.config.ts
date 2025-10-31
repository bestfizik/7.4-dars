import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../shared/entities/user.entity';
import { ArticleEntity } from '../shared/entities/article.entity';
import { CommentEntity } from '../shared/entities/comment.entity';
import { TagEntity } from '../shared/entities/tag.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_password',
  database: 'medium_clone',
  entities: [UserEntity, ArticleEntity, CommentEntity, TagEntity],
  synchronize: true,
};
