import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [TypeOrmModule.forFeature([Book,Author]),AuthorsModule],
})
export class BooksModule {}
