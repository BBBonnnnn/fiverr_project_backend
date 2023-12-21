import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, HttpCode, HttpException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UploadType } from 'src/cong-viec/entities/cong-viec.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

class UserType {
  @ApiProperty()
  name: String
  @ApiProperty()
  email: String
  @ApiProperty()
  pass_word: String
  @ApiProperty()
  phone: String
  @ApiProperty()
  birth_day: String
  @ApiProperty()
  gender: String
  @ApiProperty()
  role: String
  @ApiProperty()
  skill: String
  @ApiProperty()
  certification :string
}


 export class PaginationType {
  @ApiProperty()
  page: number
  @ApiProperty()
  pageSize: number
}


@ApiBearerAuth()
@UseGuards(AuthGuard(("jwt")))
@ApiTags('User')
@Controller('user')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}


  @HttpCode(200)
  @Get()
  findAll() {
    try{
      return this.nguoiDungService.findAll();
    }

    catch{
      throw new InternalServerErrorException(("Error"))

    }
  
    
  }

  @Post()
  create(@Body() createNguoiDungDto: UserType) {
    return this.nguoiDungService.create(createNguoiDungDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nguoiDungService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNguoiDungDto: UserType) {
    return this.nguoiDungService.update(+id, updateNguoiDungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nguoiDungService.remove(+id);
  }

  @Post('/pagination')
  pagination(@Body() pagination : PaginationType) {
    return this.nguoiDungService.pagination(pagination);
  }

  @Post('/search-name/:name')
  searchName(@Param('name') name: string) {
    return this.nguoiDungService.searchName(name);
  }
  

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
  upload(@Param('id') id: string,@UploadedFile() file: Express.Multer.File) {


    return  this.nguoiDungService.upload(+id,file);
  }
}
