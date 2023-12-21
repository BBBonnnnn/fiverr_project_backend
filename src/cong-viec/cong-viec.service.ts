import { Injectable } from '@nestjs/common';
import { CreateCongViecDto } from './dto/create-cong-viec.dto';
import { UpdateCongViecDto } from './dto/update-cong-viec.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationType } from 'src/nguoi-dung/nguoi-dung.controller';
import { Request } from 'express';

@Injectable()
export class CongViecService {
prisma  = new PrismaClient()

   async findAll() {
    try{
      let data = await this.prisma.congViec.findMany();

      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
    
  }

  async create(createCongViecDto: CreateCongViecDto,tokenDecode) {
    try{
      let {nguoi_dung_id} = tokenDecode.data
      let newdata = {...createCongViecDto,nguoi_dung_id:nguoi_dung_id}
      let data =  await this.prisma.congViec.create({data:newdata})
      return data
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

   async findOne(id: number) {
    try{
      const data = await this.prisma.congViec.findUnique({
        where: {
          cong_viec_id:id 
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async update(id: number, updateCongViecDto: UpdateCongViecDto) {
    
    try{
      const updateData = await this.prisma.congViec.update({
        where: {
          cong_viec_id: id,
        },
        data: updateCongViecDto
      })
      return updateData ;
    } catch(err){
      console.log(err)
      return "Updation Data fail !!!"
    }
    
  }

   async remove(id: number) {
    try{
      const deleteData = await this.prisma.congViec.delete({
        where: {
          cong_viec_id: id,
        },
      })
      return `Deletion success!!!`;
    } catch(err){
      console.log(err)
      return "Deletion Data fail !!!"
    }
   
  }

  async upload(id: number,file:any) {
    try{
      let data = await this.prisma.congViec.findUnique({
        where:{
          cong_viec_id:id
        }
      })
      let {path} = file
      let newData = {...data,hinh_anh:path}
      const updateData = await this.prisma.congViec.update({
        where: {
          cong_viec_id: id,
        },
        data: newData
      })
      return updateData ;
    } catch(err){
      console.log(err)
      return "Updation Data fail !!!"
    }
   
  }

  async pagination(pagination: PaginationType) {
    let { page, pageSize } = pagination;
    let index = (page - 1) * pageSize;

    let data = await this.prisma.congViec.findMany({
      skip: index,
      take: pageSize
    })
    return data
  }

  async getJobByDetailJobTypeId(detailjobtypeid: number) {
    try{
      const data = await this.prisma.congViec.findMany({
        where: {
         chi_tiet_loai_cong_viec_id:detailjobtypeid
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async getDetailJobByJobId(jobid: number) {
    try{
      const data = await this.prisma.congViec.findUnique({
        where: {
         cong_viec_id:jobid
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async getDetailJobByJobTypeId(jobtypeid: number) {
    try{
      const data = await this.prisma.chiTietLoaiCongViec.findMany({
        where: {
         loai_cong_viec_id:jobtypeid
        }
      })
      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
  }

  async getListJobByName(name: string) {
    try {
      const data = await this.prisma.congViec.findMany({
        where: {
          ten_cong_viec: {
            contains: name,
          }
        }
      })
      return data;
    } catch (err) {
      console.log(err)
      return "The action fail !!!"
    }

  }

  async getMenuJobType() {
    try{
      let data = await this.prisma.loaiCongViec.findMany();

      return data;
    } catch(err){
      console.log(err)
      return "The action fail !!!"
    }
    
  }

  
}
