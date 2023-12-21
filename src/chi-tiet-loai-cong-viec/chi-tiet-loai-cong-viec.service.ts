import { Injectable } from '@nestjs/common';
import { CreateChiTietLoaiCongViecDto } from './dto/create-chi-tiet-loai-cong-viec.dto';
import { UpdateChiTietLoaiCongViecDto } from './dto/update-chi-tiet-loai-cong-viec.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';

@Injectable()

export class ChiTietLoaiCongViecService {
  prisma  = new PrismaClient()
  
  async findAll() {
    try{
      let data = await this.prisma.chiTietLoaiCongViec.findMany();
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
    
  }

  async create(createChiTietLoaiCongViecDto: CreateChiTietLoaiCongViecDto) {
    try{
      let data =  await this.prisma.chiTietLoaiCongViec.create({data:createChiTietLoaiCongViecDto})
      return data
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async findOne(id: number) {
    try{
      const data = await this.prisma.chiTietLoaiCongViec.findUnique({
        where: {
         chi_tiet_loai_cong_viec_id:id 
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async update(id: number, updateChiTietLoaiCongViecDto: UpdateChiTietLoaiCongViecDto) {
    try{const updateData = await this.prisma.chiTietLoaiCongViec.update({
      where: {
        chi_tiet_loai_cong_viec_id: id,
      },
      data: updateChiTietLoaiCongViecDto
    })
    return updateData ;} 
    
    catch(err){
      console.log(err)
      return "Deletion Fail !!!"
    }
  }

  async remove(id: number) {
    try{
      const deleteData = await this.prisma.chiTietLoaiCongViec.delete({
        where: {
          chi_tiet_loai_cong_viec_id: id,
        },
      })
      return `deletion success!!!`;
     } catch(err){
      console.log(err)
      return "deletion  Fail !!!"
     }
  }

  async pagination(pagination: PaginationType) {
    let { page, pageSize } = pagination;
    let index = (page - 1) * pageSize;

    let data = await this.prisma.chiTietLoaiCongViec.findMany({
      skip: index,
      take: pageSize
    })
    return data
  }
}
