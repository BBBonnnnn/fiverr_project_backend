import { Injectable } from '@nestjs/common';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';

@Injectable()
export class LoaiCongViecService {
  prisma  = new PrismaClient()
 

  async findAll() {
    try{
      let data = await this.prisma.loaiCongViec.findMany();
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
    
  }

  async create(createLoaiCongViecDto: CreateLoaiCongViecDto) {
    try{
      let data =  await this.prisma.loaiCongViec.create({data:createLoaiCongViecDto})
      return data
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async findOne(id: number) {
    try{
      const data = await this.prisma.loaiCongViec.findUnique({
        where: {
          loai_cong_viec_id:id 
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }

  }

  async update(id: number, updateLoaiCongViecDto: UpdateLoaiCongViecDto) {
    try{const updateData = await this.prisma.loaiCongViec.update({
      where: {
        loai_cong_viec_id: id,
      },
      data: updateLoaiCongViecDto
    })
    return updateData ;} 
    
    catch(err){
      console.log(err)
      return "Updation Data Fail !!!"
    }
  }

  async remove(id: number) {
   try{
    const deleteData = await this.prisma.congViec.delete({
      where: {
        cong_viec_id: id,
      },
    })


    return `Delete success!!!`;
   } catch(err){
    console.log(err)
    return "Delete Data Fail !!!"
   }
  }


  async pagination(pagination: PaginationType) {
    let { page, pageSize } = pagination;
    let index = (page - 1) * pageSize;

    let data = await this.prisma.loaiCongViec.findMany({
      skip: index,
      take: pageSize
    })
    return data
  }
}
