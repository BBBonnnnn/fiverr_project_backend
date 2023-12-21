import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

class BinhLuanType {
  @ApiProperty()
  cong_viec_id: number
  @ApiProperty()
  ngay_binh_luan: Date
  @ApiProperty()
  noi_dung: String
  @ApiProperty()
  sao_binh_luan: number
}


@ApiBearerAuth()
@UseGuards(AuthGuard(("jwt")))
@ApiTags('Comment')
@Controller('comment')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Get()
  findAll() {
    return this.binhLuanService.findAll();
  }

  @Post()
  create(@Req() req:Request, @Body() createBinhLuanDto: BinhLuanType) {
    let tokenDecode = req.user;
    return this.binhLuanService.create(createBinhLuanDto,tokenDecode);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.binhLuanService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBinhLuanDto: BinhLuanType) {
    return this.binhLuanService.update(+id, updateBinhLuanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.binhLuanService.remove(+id);
  }
  @Get('get-comment-by-jobId/:id')
  getCommentbyJobId(@Param('id') id: string) {
    return this.binhLuanService.getCommentbyJobId(+id);
  }
}
