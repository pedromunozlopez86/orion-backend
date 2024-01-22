import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/authors/entities/author.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({name:'Book'})
export class Book {
  @ApiProperty({example:'1',description:'ID incremental',})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({example:'Papelucho'})
  @Column('text',{unique:true})
  title: string;

  @ApiProperty({example:10})
  @Column('int')
  chapters: number;

  @ApiProperty({example:100})
  @Column('int')
  pages: number;

  @ManyToMany(() => Author, (author) => author.books,{cascade:true})
  @JoinTable()
  authors: Author[];
}
