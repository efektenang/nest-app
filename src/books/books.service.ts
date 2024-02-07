import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const isReady = await this.prisma.book.findUnique({
      where: {
        title: createBookDto.title,
      },
    });

    if (isReady) throw new ConflictException('Title book is already exist');

    const saveBook = await this.prisma.book.create({
      data: {
        ...createBookDto,
        publishedAt: new Date(createBookDto.publishedAt),
      },
    });
    return saveBook;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) throw new NotFoundException('Data yang kamu cari tidak ada');

    return this.prisma.book.update({
      where: { id },
      data: {
        ...updateBookDto,
        publishedAt: new Date(updateBookDto.publishedAt),
      },
    });
  }

  async remove(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id }
    })

    if (!book) throw new NotFoundException('Data yang kamu cari tidak ada')

    return this.prisma.book.delete({
      where: {id}
    })
  }
}
