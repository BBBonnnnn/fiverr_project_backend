import { Injectable } from '@nestjs/common';
import { CreateThueCongViecDto } from './dto/create-thue-cong-viec.dto';
import { UpdateThueCongViecDto } from './dto/update-thue-cong-viec.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';

@Injectable()
export class ThueCongViecService {
  prisma  = new PrismaClient()


  async findAll() {
    try{
      let data = await this.prisma.thueCongViec.findMany();
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async create(createThueCongViecDto: CreateThueCongViecDto,tokenDecode) {
    try{
      let {nguoi_dung_id} = tokenDecode.data
      let newdata = {...createThueCongViecDto,nguoi_dung_id:nguoi_dung_id}
      let data =  await this.prisma.thueCongViec.create({data:newdata})
      return data
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async findOne(id: number) {
    try{
      const data = await this.prisma.thueCongViec.findUnique({
        where: {
         thue_cong_viec_id:id 
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async update(id: number, updateThueCongViecDto: UpdateThueCongViecDto) {
    try{const updateData = await this.prisma.thueCongViec.update({
      where: {
        thue_cong_viec_id: id,
      },
      data: updateThueCongViecDto
    })
    return updateData ;} 
    
    catch(err){
      console.log(err)
      return "Update Data Fail !!!"
    }
  }

  async remove(id: number) {
    try{
      const deleteData = await this.prisma.thueCongViec.delete({
        where: {
          thue_cong_viec_id: id,
        },
      })
      return `Delete success!!!`;
     } catch(err){
      console.log(err)
      return "Delete Data Fail !!!"
     }
  }

  async Paginate(pagination: PaginationType) {
    let { page, pageSize } = pagination;
    let index = (page - 1) * pageSize;

    let data = await this.prisma.thueCongViec.findMany({
      skip: index,
      take: pageSize
    })
    return data
  }


  async getListRentedJobs(id: number) {
   
    let data = await this.prisma.thueCongViec.findMany({
      where:{
        nguoi_dung_id:id
      }
    })
    return data
  }


  async compeleteJob(id: number,hoanThanhCV:any) {
    try{
      let data =  await this.prisma.thueCongViec.findUnique({
        where:{
          thue_cong_viec_id: id
        }
      })
      let {hoan_thanh} = hoanThanhCV
      let  newData = {...data,hoan_thanh:hoan_thanh}
      const updateData = await this.prisma.thueCongViec.update({
      where: {
        thue_cong_viec_id: id,
      },
      data: newData
    })
    return updateData ;} 
    catch(err){
      console.log(err)
      return "Update Data Fail !!!"
    }
  }
}
