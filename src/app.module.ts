import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { OsrmModule } from './osrm/osrm.module';

@Module({
  imports: [BooksModule, OsrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
