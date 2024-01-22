import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Author } from './entities/author.entity';

@ApiTags('Authors Service')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Autor registrado', type: Author })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }
}
