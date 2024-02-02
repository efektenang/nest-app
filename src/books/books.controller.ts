import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createBookDto: CreateBookDto, @Res() res) {
    return this.booksService
      .create(createBookDto)
      .then((ok) => {
        return res.json({
          message: 'OK',
          data: ok,
        });
      })
      .catch((error) => {
        return res.status(error.status).json({
          error: error.response,
        });
      });
  }

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res,
  ) {
    return this.booksService
      .update(+id, updateBookDto)
      .then((ok) => {
        return res.json({
          message: 'OK',
          data: ok,
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error: error.response,
        });
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
