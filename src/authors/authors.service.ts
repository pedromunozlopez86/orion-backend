import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const author = this.authorRepository.create(createAuthorDto);
      await this.authorRepository.save(author);
      return author;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`help`);
    }
  }

  async findAll() {
    return await this.authorRepository.find({relations:['books']})
  }

}
