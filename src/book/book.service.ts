import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Book } from './book.entity';
import { BaseResponse } from '../utils/response.utils';
import { CreateBookDTO, findBookDto } from './book.dto';
import { skip } from 'node:test';                                                                                                                                                                                                                           
@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super();
  }

  async getBook(query: findBookDto): Promise<ResponsePagination> {
    const {
      page,
      pageSize,
      title,
      to_year,
      from_year,
      author,
      desckripsi,
      keyword,
    } = query;

    const filter: { [key: string]: any } = {};
    const search: { [key: string]: any }[] = [];

    if (keyword) {
      search.push(
        { title: Like(`%${keyword}%`) },
        { author: Like(`%${keyword}%`) },
        { year: Like(`%${keyword}%`) },
        { from_year: Like(`%${keyword}%`) },
        { to_year: Like(`%${keyword}%`) },
        { desckripsi: Like(`%${keyword}%`) },
      );
    } else {
      if (title) {
        filter.title = Like(`%${title}$`);
      }
      if (desckripsi) {
        filter.deskripsi = Like(`%${desckripsi}$`);
      }
      if (author) {
        filter.author = Like(`%${author}$`);
      }
      if (from_year && to_year) {
        filter.year = Between(from_year, to_year)
      }
      if (from_year && !to_year) {
        filter.year = Between(from_year, from_year)
      }
    }
    const total = await this.bookRepository.count({
      where: keyword ? search : filter,
    });

    const result = await this.bookRepository.find({
      where: keyword ? search : filter,
      skip: total,
      take: Number(pageSize),
    });



    return this._pagination(
      'success get data',
      result,
      total,
      Number(page),
      Number(pageSize),
    );
  }

  async createBook(payload: CreateBookDTO): Promise<ResponseSuccess> {
    const data = await this.bookRepository.save(payload);
    return this._success('success send data', data);
  }

  async DetailBook(param: string): Promise<ResponseSuccess> {
    const book = await this.bookRepository.findOne({
      where: { id: JSON.parse(param) },
    });

    if (book == null) {
      throw new HttpException('data tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    return this._success('success update data');
  }

  async updateBook(
    id: number,
    payload: CreateBookDTO,
  ): Promise<ResponseSuccess> {
    const update = await this.bookRepository.update(id, payload);

    if (update.affected == 0) {
      throw new HttpException('data tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'success change data',
      status: 'berhasil',
    };
  }

  async deleteBook(id: number): Promise<ResponseSuccess> {
    const deleted = await this.bookRepository.delete(id);
    return {
      message: 'berhasil hapus data',
      status: 'mantap bang',
      data: deleted,
    };
  }
  async deleteMultiBook(id: string[]): Promise<ResponseSuccess> {
    const deleted = await this.bookRepository.delete(id);

    if (deleted.affected === 0) {
      throw new HttpException(
        'data yang telah di hapus tidak dapat di hapus lagi',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      message: 'berhasil hapus data',
      status: 'mantap bang',
      data: deleted,
    };
  }
}
