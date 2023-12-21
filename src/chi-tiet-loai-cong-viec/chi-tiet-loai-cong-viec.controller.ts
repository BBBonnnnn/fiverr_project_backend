import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';
import { CreateChiTietLoaiCongViecDto } from './dto/create-chi-tiet-loai-cong-viec.dto';
import { UpdateChiTietLoaiCongViecDto } from './dto/update-chi-tiet-loai-cong-viec.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';
import { AuthGuard } from '@nestjs/passport';

class ChiTietLoaiCongViecType {
  @ApiProperty()
  ten_chi_tiet: String
  @ApiProperty()
  hinh_anh: String
  @ApiProperty()
  loai_cong_viec_id :number
}



@ApiBearerAuth()
@UseGuards(AuthGuard(("jwt")))
@ApiTags('DetaiJobType')
@Controller('detail-job-type')
export class ChiTietLoaiCongViecController {
  constructor(private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService) { }


  @Get()
  findAll() {
    return this.chiTietLoaiCongViecService.findAll();
  }

  @Post()
  create(@Body() createChiTietLoaiCongViecDto: ChiTietLoaiCongViecType) {
    return this.chiTietLoaiCongViecService.create(createChiTietLoaiCongViecDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chiTietLoaiCongViecService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateChiTietLoaiCongViecDto: ChiTietLoaiCongViecType) {
    return this.chiTietLoaiCongViecService.update(+id, updateChiTietLoaiCongViecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chiTietLoaiCongViecService.remove(+id);
  }

  @Post('/pagination')
  pagination(@Body() pagination : PaginationType) {
    return this.chiTietLoaiCongViecService.pagination(pagination);
  }
  
}
