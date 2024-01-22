import {  ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({name:'Author'})
export class Author {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({example:'1',description:'ID incremental',})
  id: number;

  @ApiProperty({example:'Marcela Paz'})
  @Column('text',{unique:true})
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}