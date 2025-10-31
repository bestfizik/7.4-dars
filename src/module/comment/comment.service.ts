import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../../shared/entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  create(dto: CreateCommentDto) {
    const comment = this.commentRepo.create(dto);
    return this.commentRepo.save(comment);
  }

  findAll() {
    return this.commentRepo.find({ relations: ['author', 'article'] });
  }
}
