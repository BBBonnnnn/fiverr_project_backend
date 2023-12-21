import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ThueCongViecService } from './thue-cong-viec.service';
import { CreateThueCongViecDto } from './dto/create-thue-cong-viec.dto';
import { UpdateThueCongViecDto } from './dto/update-thue-cong-viec.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

class ThueCongViecType {
  @ApiProperty()
  cong_viec_id: number
  @ApiProperty()
  ngay_thue: Date
  @ApiProperty()
  hoan_thanh: boolean
}

class CompeleteJobType {
  @ApiProperty()
  hoan_thanh: boolean
}


@ApiBearerAuth()
@UseGuards(AuthGuard(("jwt")))
@ApiTags('RentJob')
@Controller('rent-job')
export class ThueCongViecController {
  constructor(private readonly thueCongViecService: ThueCongViecService) {}

  @Get()
  findAll() {
    return this.thueCongViecService.findAll();
  }


  @Post()
  create(@Req() req:Request,@Body() createThueCongViecDto: ThueCongViecType) {
    let tokenDecode = req.user;
    return this.thueCongViecService.create(createThueCongViecDto,tokenDecode);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thueCongViecService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateThueCongViecDto:ThueCongViecType ) {
    return this.thueCongViecService.update(+id, updateThueCongViecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thueCongViecService.remove(+id);
  }

  @Get('/pagination')
  Paginate(@Body() pagination : PaginationType) {
    return this.thueCongViecService.Paginate(pagination);
  }


  @Get('/get-list-rented-job/:id')
  getListRentedJobs(@Param('id') id : number) {
    return this.thueCongViecService.getListRentedJobs(+id);
  }

  @Post('/compelete-job/:id')
  compeleteJob(@Param('id') id : number,@Body() hoanThanhCV :CompeleteJobType) {
    return this.thueCongViecService.compeleteJob(+id,hoanThanhCV);
  }
}
