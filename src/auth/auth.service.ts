import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { LoginType, SignUpType } from './auth.controller';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  prisma = new PrismaClient()
  constructor(
    private jwtService: JwtService
  ) { }


  async create(createAuthDto: any) {
    let { email, pass_word } = createAuthDto;
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: email
      }
    })
    if (checkEmail) {
      return 'Email already exists !!!'
    }
    let passCrypt = bcrypt.hashSync(pass_word, 10);
    let newData = { ...createAuthDto, pass_word: passCrypt }
    await this.prisma.nguoiDung.create({ data: newData })
    return "Registration successful !!!"

  }

  async findOne(loginAuthDto: any) {
    let { email, pass_word } = loginAuthDto;
    const checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: email
      }
    })
    if (checkEmail) {
      let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word)
      if (checkPass) {
        let token = this.jwtService.sign({data:checkEmail},{
          expiresIn :"60d",secret:"BIMAT"
        })
        return token
      } else {
        return "Incorrect password !!!"
      }
    } else {
      return "Incorrect  email !!!"
    }

  }

}
