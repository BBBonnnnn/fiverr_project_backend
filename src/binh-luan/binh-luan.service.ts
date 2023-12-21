import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BinhLuanService {
  prisma  = new PrismaClient()

  async findAll() {
    try{
      let data = await this.prisma.binhLuan.findMany();
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async create(createBinhLuanDto: CreateBinhLuanDto,tokenDecode) {
    try{
      let {nguoi_dung_id} = tokenDecode.data;
      let newdata = {...createBinhLuanDto,nguoi_dung_id:nguoi_dung_id}
      let data =  await this.prisma.binhLuan.create({data:newdata})
      return data
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async findOne(id: number) {
    try{
      const data = await this.prisma.binhLuan.findUnique({
        where: {
         binh_luan_id:id 
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async update(id: number, updateBinhLuanDto: UpdateBinhLuanDto) {
    try{const updateData = await this.prisma.binhLuan.update({
      where: {
        binh_luan_id: id,
      },
      data: updateBinhLuanDto
    })
    return updateData ;} 
    
    catch(err){
      console.log(err)
      return "Update Data Fail !!!"
    }
  }

  async remove(id: number) {
    try{
      const deleteData = await this.prisma.binhLuan.delete({
        where: {
          binh_luan_id: id,
        },
      })
      return `Delete success!!!`;
     } catch(err){
      console.log(err)
      return "Delete Data Fail !!!"
     }
  }


  async getCommentbyJobId(id:number) {
    try{
      let data = await this.prisma.binhLuan.findMany({
        where:{
          cong_viec_id:id
        }
      });
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }
}
