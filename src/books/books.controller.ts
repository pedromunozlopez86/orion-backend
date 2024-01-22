import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './entities/book.entity';

@ApiTags('Books Service')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Libro registrado', type: Book  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Get('/average/:id')
  findOneAverage(@Param('id') id: string) {
    return this.booksService.findAverage(+id);
  }
}
