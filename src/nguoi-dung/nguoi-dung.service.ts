import { Injectable } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationType } from './nguoi-dung.controller';
import bcrypt from 'bcrypt'
@Injectable()
export class NguoiDungService {
  prisma = new PrismaClient()

  async findAll() {
    try {
      let data = await this.prisma.nguoiDung.findMany();
      return data;
    } catch (err) {
      console.log(err)
      return "The action fail !!!"
    }
  }


  async create(createNguoiDungDto: CreateNguoiDungDto) {
    try {
      let data = await this.prisma.nguoiDung.create({ data: createNguoiDungDto })
      return data
    } catch (err) {
      console.log(err)
      return "The action fail !!!"
    }
  }


  async findOne(id: number) {
    try {
      const data = await this.prisma.nguoiDung.findUnique({
        where: {
          nguoi_dung_id: id
        }
      })
      return data;
    } catch (err) {
      console.log(err)
      return "The action fail !!!"
    }
  }

  async update(id: number, updateNguoiDungDto: UpdateNguoiDungDto) {
    try {
      const updateData = await this.prisma.nguoiDung.update({
        where: {
          nguoi_dung_id: id,
        },
        data: updateNguoiDungDto
      })
      return updateData;
    }

    catch (err) {
      console.log(err)
      return "Updation Fail !!!"
    }
  }

  async remove(id: number) {
    try {
      const deleteData = await this.prisma.nguoiDung.delete({
        where: {
          nguoi_dung_id: id,
        },
      })
      return `Deletion success!!!`;
    } catch (err) {
      console.log(err)
      return "Deletion Fail !!!"
    }
  }


  async pagination(pagination: PaginationType) {
    let { page, pageSize } = pagination;
    let index = (page - 1) * pageSize;

    let data = await this.prisma.nguoiDung.findMany({
      skip: index,
      take: pageSize
    })
    return data
  }
  async searchName(name: string) {
    try {
      const data = await this.prisma.nguoiDung.findMany({
        where: {
          name: {
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

  async upload(id: number,file:any) {
    try{
      let data = await this.prisma.nguoiDung.findUnique({
        where:{
          nguoi_dung_id:id
        }
      })
      let {path} = file
      let newData = {...data,avatar:path}
      const updateData = await this.prisma.nguoiDung.update({
        where: {
          nguoi_dung_id: id,
        },
        data: newData
      })
      return updateData ;
    } catch(err){
      console.log(err)
      return "Updation fail !!!"
    }
   
  }

}
