import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../../shared/entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepo: Repository<TagEntity>,
  ) {}

  create(dto: CreateTagDto) {
    const tag = this.tagRepo.create(dto);
    return this.tagRepo.save(tag);
  }

  findAll() {
    return this.tagRepo.find({ relations: ['articles'] });
  }
}
