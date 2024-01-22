import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const names = createBookDto.authors.map((n) => n.name);

      const finded:Author[] = await this.authorRepository.findBy({ name: In(names) })
      console.log('finded: ',finded)
      const book = this.bookRepository.create(createBookDto);

      if(finded.length === 0){
        await this.bookRepository.save(book);
        return book;
      } else {
        let findedAuthors = finded
        let newBook ={
          authors:findedAuthors,
          ...book
        }
        await this.bookRepository.save(newBook);
        return newBook;
      }






    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new BadRequestException(`${error.detail}`);
      throw new InternalServerErrorException(`help`);
    }
  }

  async findAll() {
    return this.bookRepository.find({ relations: ['authors'] });
  }

  async findAverage(id: number) {
    try {
      // se busca libro por ID, si no lo encuentra error 400
      const bookFinded:Book = await this.findOne(id);
      if(bookFinded){
        const { pages, chapters } = bookFinded;
        let average: number = pages / chapters;
        let response = {
          id: id.toString(),
          avg: average.toFixed(2).toString(),
        };
        return response;
      } else {
        return new BadRequestException(`Libro no encontrado con el ID: ${id}`)
      }
    } catch (error) {
      console.log(error);
      this.handleDBExceptions(error);

    }
  }

  async findOne(id: number) {
    try {
      return await this.bookRepository.findOneBy({ id });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);
    throw new InternalServerErrorException(
      'Error inesperado, revisar server logs',
    );
  }
}
