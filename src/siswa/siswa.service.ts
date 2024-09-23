import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SiswaDto, findSiswaDto } from './siswa.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Siswa } from './siswa.entity';
import { BaseResponse } from 'src/utils/response.utils';
import { NotFoundError, retry } from 'rxjs';

@Injectable()
export class SiswaService extends BaseResponse {
  constructor(
    @InjectRepository(Siswa)
    private readonly siswaRepository: Repository<Siswa>,
  ) {
    super();
  }

  async getSiswa(query: findSiswaDto) {
    const {
      keyword,
      nama,
      nik,
      nisn,
      page,
      pageSize,
      tanggal_lahir,
      tempat_lahir,
    } = query;
    const filter: { [key: string]: any } = {};
    const search: { [key: string]: any }[] = [];

    if (keyword) {
      search.push(
        { nama: Like(`%${keyword}%`) },
        { tempat_lahir: Like(`%${keyword}%`) },
        { tanggal_lahir: Like(`%${keyword}%`) },
        { nisn: Like(`%${keyword}%`) },
        { nik: Like(`%${keyword}%`) },
      );
    } else {
      if (nama) {
        filter.nama = Like(`%${nama}$`);
      }
      if (tempat_lahir) {
        filter.tempat_lahir = Like(`%${tempat_lahir}$`);
      }
    }
    const total = await this.siswaRepository.count({
      where: keyword ? search : filter,
    });

    const result = await this.siswaRepository.find({
      skip: total,
      take: pageSize,
    });
    const data = await this.siswaRepository.find();

    return this._pagination('OK', data, total, Number(page), Number(pageSize));
  }

  async detailSiswa(id: number) {
    const siswa = await this.siswaRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!siswa) {
      throw new NotFoundException('siswa not found');
    }
    return this._success('OK', siswa);
  }

  async createSiswa(payload: SiswaDto) {
    try {
      const create = await this.siswaRepository.save(payload);
      const find = await this.siswaRepository.findOne({
        where: { id: payload.id },
      });
      return this._success('OK', create);
    } catch (err) {
      if (err) throw new HttpException('Email sudah digunakan', 422);
    }
  }
  async updateSiswa(id: number, siswa: SiswaDto) {
      
      const find = await this.siswaRepository.findOne({
        where: { id: id },
      })
      const update = await this.siswaRepository.update(id, siswa);
      if (find === null) {
        throw new NotFoundException('siswa not found');
      }
      if (siswa.email === find.email) {
        throw new HttpException("Email sudah digunakan siswa lain", 422);
      }
      return this._success("OK", find);
   
  }
}
