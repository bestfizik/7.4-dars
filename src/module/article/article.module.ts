import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../../shared/entities/article.entity';
import { TagEntity } from '../../shared/entities/tag.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, TagEntity])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
