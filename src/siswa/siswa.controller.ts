import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { SiswaDto } from './siswa.dto';
import { Pagination } from 'src/utils/decorator/pagination.decoration';

@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) {}
  @Get('list')
  async getSiswa(@Pagination() query: any) {
    return this.siswaService.getSiswa(query);
  }

  @Get('/detail/:id')
  async detailSIswa(@Param('id') id: number) {
    return this.siswaService.detailSiswa(id);
  }

  @Post('create')
  async createSiswa(@Body() payload: SiswaDto) {
    return this.siswaService.createSiswa(payload);
  }

  @Put('update/:id')
  async updateSiswa(@Param('id') id: number, @Body() payload: SiswaDto) {
    return this.siswaService.updateSiswa(id, payload);
  }
}
