import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Author } from 'src/authors/entities/author.entity';

export class CreateBookDto {
  @ApiProperty({
    description: 'Titulo del libro',
    example:"Papelucho",
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description:'N° de Capitulos',
    example:10
  })
  @IsNumber()
  @IsPositive()
  chapters: number;

  @ApiProperty({
    description:'N° de Páginas',
    example:150
  })
  @IsNumber()
  @IsPositive()
  pages: number;

  @ApiProperty({
    description:'Autor(es)',
    example:["Marcela Paz","Pilar Sordo"]
  })
  @IsArray()
  authors: Author[];
}
