import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Put, UseGuards } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateCongViecDto } from './dto/create-cong-viec.dto';
import { UpdateCongViecDto } from './dto/update-cong-viec.dto';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadType } from './entities/cong-viec.entity';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


class CongViecType {
  @ApiProperty()
  ten_cong_viec: String
  @ApiProperty()
  danh_gia: number
  @ApiProperty()
  gia_tien: number
  @ApiProperty()
  hinh_anh: String
  @ApiProperty()
  mo_ta: String
  @ApiProperty()
  mo_ta_ngan: String
  @ApiProperty()
  sao_cong_viec: number
  @ApiProperty()
  chi_tiet_loai_cong_viec_id: number
}




@ApiBearerAuth()
@UseGuards(AuthGuard(("jwt")))
@ApiTags('Jobs')
@Controller('api/jobs')
export class CongViecController {
  constructor(
    private readonly congViecService: CongViecService,
    private configService: ConfigService
  ) { }
  @Get()
  findAll() {
    return this.congViecService.findAll();
  }


  @Post()
  create(@Req() req:Request, @Body() createCongViecDto: CongViecType) {
    let tokenDecode = req.user;
    return this.congViecService.create(createCongViecDto,tokenDecode);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congViecService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCongViecDto: CongViecType) {
    return this.congViecService.update(+id, updateCongViecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congViecService.remove(+id);
  }


  // ---------------Upload File-------------
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadType
  })
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }
  ))
  @Post('/upload-image-job/:id')
  upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {


    return this.congViecService.upload(+id, file);
  }

  @Post('/pagination')
  pagination(@Body() pagination: PaginationType) {
    return this.congViecService.pagination(pagination);
  }

  @Get('/get-job-by-detail-jobtype/:detailjobtypeid')
  getJobByDetailJobTypeId(@Param('detailjobtypeid') detailjobtypeid: string) {
    return this.congViecService.getJobByDetailJobTypeId(+detailjobtypeid);
  }

  @Get('/get-detail-job-by-jobid/:jobid')
  getDetailJobByJobId(@Param('jobid') jobid: string) {
    return this.congViecService.getDetailJobByJobId(+jobid);
  }

  @Get('/get-detail-job-by-jobtypeId/:jobtypeid')
  getDetailJobByJobTypeId(@Param('jobtypeid') jobtypeid: string) {
    return this.congViecService.getDetailJobByJobTypeId(+jobtypeid);
  }


  @Get('/get-list-job-by-name/:name')
  getListJobByName(@Param('name') name: string) {
    return this.congViecService.getListJobByName(name);
  }

  @Get('/get-menu-jobtype/jobtype')
  getMenuJobType() {
    return this.congViecService.getMenuJobType();
  }
}

