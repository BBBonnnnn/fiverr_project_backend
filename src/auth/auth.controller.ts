import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class SignUpType {
  @ApiProperty()
  name: String
  @ApiProperty()
  email: string
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

export class LoginType { 
  @ApiProperty()
  email: string 
  @ApiProperty()
  pass_word: String 
}



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up")
  create(@Body() createAuthDto: SignUpType) {
    return this.authService.create(createAuthDto);
  }

  @Post("/login")
  findOne(@Body() loginAuthDto: LoginType) {
    return this.authService.findOne(loginAuthDto);
  }

 
}
