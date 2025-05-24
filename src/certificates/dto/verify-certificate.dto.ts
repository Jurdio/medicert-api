import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCertificateDto {
    @ApiProperty({
        example: '9c857403d9e7bb1c7a3d6d9c7f2dbf78c3a7c3a7d9c7a3f6b1c7d9e7a3c3a7f6',
        description: 'SHA256-хеш довідки для перевірки в базі або блокчейні',
    })
    @IsString()
    @IsNotEmpty()
    hash: string;
}
