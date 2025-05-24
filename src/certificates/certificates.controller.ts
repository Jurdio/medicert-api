import {
    Controller, Post, Body, UseGuards, Get, Param
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { VerifyCertificateDto } from './dto/verify-certificate.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('api/v1/certificates')
@UseGuards(ApiKeyGuard)
export class CertificatesController {
    constructor(private readonly certService: CertificatesService) {}

    @Post()
    async create(@Body() dto: CreateCertificateDto) {
        return this.certService.create(dto);
    }

    @Post('verify')
    async verify(@Body() dto: VerifyCertificateDto) {
        return this.certService.verify(dto.hash);
    }
}
