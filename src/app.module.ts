import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './shared/entities/user.entity';
import { AuthEntity } from './shared/entities/auth.entity';
import { ArticleEntity } from './shared/entities/article.entity';
import { CommentEntity } from './shared/entities/comment.entity';
import { TagEntity } from './shared/entities/tag.entity';
import { AuthModule } from './module/auth/auth.module';
import { ArticleModule } from './module/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bestfizik05',
      database: 'medium',
      entities: [
        UserEntity,
        AuthEntity,
        ArticleEntity,
        CommentEntity,
        TagEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ArticleModule,
  ],
})
export class AppModule {}
