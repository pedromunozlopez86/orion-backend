import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthorsModule,
    BooksModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      database:process.env.DB_NAME,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
