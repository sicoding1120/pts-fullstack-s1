import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SiswaDto, findSiswaDto } from './siswa.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Siswa } from './siswa.entity';
import { BaseResponse } from 'src/utils/response.utils';

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

    return this._pagination(
      'OK',
      result,
      total,
      Number(page),
      Number(pageSize),
    );
  }

  async detailSiswa(id: number) {
    const siswa = await this.siswaRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!siswa) {
      throw new HttpException('siswa not found', 404);
    }
    return this._success('OK', siswa);
  }

  async createSiswa(payload: SiswaDto) {
    try {

      const find = await this.siswaRepository.findOne({
        where: {email: payload.email}
      })
     
      if(payload.email === find.email) {
        throw new HttpException("Email Sudah di gunakan", 422) ; 
      }
      const createSiswa = await this.siswaRepository.save(payload);
      return this._success('OK');
      
      
    } catch (err) {
      if (err) {
        throw new HttpException('Email sudah digunakan', 422);
      }
    }
  }
  async updateSiswa(id: number, siswa: SiswaDto) {
    try {
      const existingSiswa = await this.siswaRepository.findOne({
        where: { id },
      });

      if (!existingSiswa) {
        throw new HttpException('Siswa not found', HttpStatus.NOT_FOUND, {
          cause: new Error(),
        });
      }

      if (siswa.nisn && siswa.nisn.length !== 10) {
        throw new BadRequestException(
          'NISN must be exactly 10 characters long',
        );
      }

      if (siswa.email === existingSiswa.email) {
          throw new BadRequestException('Email sudah digunakan siswa lain');
      }

      // Melakukan update
      const updateResult = await this.siswaRepository.update(id, siswa);

      if (updateResult.affected === 0) {
        throw new HttpException('Failed to update Siswa', 422);
      }

      return this._success(
        'OK',
        updateResult
      );
      
    } catch (error) {
      // Menangani kesalahan dan mengembalikan status code 422 jika perlu
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, 422);
      } else {
        throw new HttpException("siswa not found", 404, error);
      }
    }
  }
}
