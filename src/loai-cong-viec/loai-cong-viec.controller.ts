import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';
import { AuthGuard } from '@nestjs/passport';

class LoaiCongViecType {
  @ApiProperty()
  ten_loai_chi_tiet: string
}


@ApiBearerAuth()
@UseGuards(AuthGuard(("jwt")))
@ApiTags('JobType')
@Controller('api/jobtype')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @Get()
  findAll() {
    return this.loaiCongViecService.findAll();
  }


  @Post()
  create(@Body() createLoaiCongViecDto: LoaiCongViecType) {
    return this.loaiCongViecService.create(createLoaiCongViecDto);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loaiCongViecService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLoaiCongViecDto: LoaiCongViecType) {
    return this.loaiCongViecService.update(+id, updateLoaiCongViecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loaiCongViecService.remove(+id);
  }

  @Post('/pagination')
  pagination(@Body() pagination : PaginationType) {
    return this.loaiCongViecService.pagination(pagination);
  }
}
