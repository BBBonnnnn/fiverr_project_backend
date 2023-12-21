import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CongViecModule } from './cong-viec/cong-viec.module';
import { ConfigModule } from '@nestjs/config';
import { LoaiCongViecModule } from './loai-cong-viec/loai-cong-viec.module';
import { ChiTietLoaiCongViecModule } from './chi-tiet-loai-cong-viec/chi-tiet-loai-cong-viec.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { ThueCongViecModule } from './thue-cong-viec/thue-cong-viec.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CongViecModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    LoaiCongViecModule,
    ChiTietLoaiCongViecModule,
    NguoiDungModule,
    BinhLuanModule,
    ThueCongViecModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
