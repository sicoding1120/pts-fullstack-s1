import { OmitType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import {IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";

export class BookDTO {
    @IsOptional()
    id: number;

    @IsNotEmpty()
    @Length(5, 15)
    title: string;

    @IsNotEmpty()
    @Length(5, 15)
    author: string


    @IsNotEmpty()
    @Min(2020)
    @Max(2024)
    year: number

    @IsNotEmpty()
    desckripsi: string

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    from_year: number


    @IsOptional()
    @IsInt()
    @Type(() => Number)
    to_year: number
}

export class CreateBookDTO extends OmitType(BookDTO, ['id']) {}
export class UpdateBookDTO extends BookDTO { }

export class findBookDto {
  @IsInt()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @Type(() => Number)
  pageSize = 10;

  @IsNotEmpty()
  @Length(5, 15)
  title: string;

  @IsNotEmpty()
  @Length(5, 15)
  author: string;

  @IsNotEmpty()
  @Min(2020)
  @Max(2024)
  year: number;

  @IsNotEmpty()
  desckripsi: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  from_year: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  to_year: number;

  @IsOptional()
  keyword:string
}