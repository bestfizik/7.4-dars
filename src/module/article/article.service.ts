import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../../shared/entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
  ) {}

  create(dto: CreateArticleDto) {
    const article = this.articleRepo.create(dto);
    return this.articleRepo.save(article);
  }

  findAll() {
    return this.articleRepo.find({ relations: ['author', 'tags', 'comments'] });
  }

  async findOne(id: number) {
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: ['author', 'tags', 'comments'],
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async update(id: number, dto: UpdateArticleDto) {
    const article = await this.findOne(id);
    Object.assign(article, dto);
    return this.articleRepo.save(article);
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    return this.articleRepo.remove(article);
  }
}
