import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificateDto {
    @ApiProperty({
        example: '9c857403d9e7bb1c7a3d6d9c7f2dbf78c3a7c3a7d9c7a3f6b1c7d9e7a3c3a7f6',
        description: 'SHA256 hash of the PDF certificate',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    pdfHash: string;

    @ApiProperty({
        example: 'fitness',
        description: 'Type of certificate: vaccination, fitness, illness etc.',
        enum: ['vaccination', 'fitness', 'illness'],
        required: true
    })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        example: 'Gf4z2NkQydf7Aa2Dpzq98BdZtD8ZT8K3FVbnLdADQ6sE',
        description: 'Solana wallet public key of the patient',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    patientPublicKey: string;
}
