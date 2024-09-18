import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
    IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';

export class SiswaDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  @Length(1, 100, { message: 'Nama tidak boleh kosong' })
  nama?: string;

  @IsOptional()
  @Length(1, 100, {message: 'Format email salah, harap masukkan email yang valid',})
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100, { message: 'Tempat lahir tidak boleh kosong' })
  tempat_lahir?: string;

  @IsOptional()
  @IsDateString()
  @Length(1, 100, { message: 'Format Tanggal Lahir salah' })
  tanggal_lahir?: string;

  @IsOptional()
  @IsString()
  @Length(10, 10, { message: 'NISN harus terdiri dari 10 karakter' })
  nisn?: string;

  @IsOptional()
  @IsString()
  @Length(16, 16, { message: 'NIK harus terdiri dari 16 karakter' })
  nik?: string;


  @IsOptional()
  @IsString()
  alamat?: string;
}

export class CreateSiswaDto extends OmitType(SiswaDto, ['id']) {}
export class UpdateSiswaDto extends SiswaDto {}

export class findSiswaDto {
  @IsInt()
  @Type(() => Number)
  page = 0;

  @IsInt()
  @Type(() => Number)
  pageSize = 1;

  @IsNotEmpty()
  @Length(5, 15)
  nama: string;

  @IsNotEmpty()
  @Length(5, 15)
  tempat_lahir: string;
  @IsNotEmpty()
  @Length(12)
  tanggal_lahir: Date;
  @IsNotEmpty()
  nisn: string;
  @IsNotEmpty()
  nik: string;
  @IsOptional()
  keyword: string;
}
