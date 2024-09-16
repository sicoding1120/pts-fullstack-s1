import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO, findBookDto } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async getBook(@Query()  query:findBookDto):Promise<ResponseSuccess> {
    return await this.bookService.getBook(query);
  }

  @Get('detail/:id')
  async getDetailBook(@Param('id') id: string):Promise<ResponseSuccess> {
    return await this.bookService.DetailBook(id);
  }
  @Post('create')
  async simpanBook(@Body() payload: CreateBookDTO): Promise<ResponseSuccess> {
    return await this.bookService.createBook(payload);
    }
    
    @Put('update/:id')
    async update(@Body() payload:any, @Param('id') id: number): Promise<ResponseSuccess> {
        return await this.bookService.updateBook(id, payload);
  }
  
  @Delete('delete/:id')
  async deleteBook(@Param('id') id: number ): Promise<ResponseSuccess> {
    return await  this.bookService.deleteBook(id)
  }
  @Delete('delete')
  async deleteMultiBook(@Query('id') id: string): Promise<ResponseSuccess> {
    const isArray = id.split(",");
    return await this.bookService.deleteMultiBook(isArray)
  }
}
