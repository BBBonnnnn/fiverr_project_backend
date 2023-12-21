import { ApiProperty } from "@nestjs/swagger";

export class CongViec {}


export class UploadType {
    @ApiProperty({type:String,format:"binary"})
    file:any
}