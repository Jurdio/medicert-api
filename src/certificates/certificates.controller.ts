import {
    Controller, Post, Body, UseGuards, Get, Param
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { VerifyCertificateDto } from './dto/verify-certificate.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiSecurity,
    ApiBody
} from '@nestjs/swagger';
import { Certificate } from './entities/certificate.entity';

@ApiTags('certificates')
@Controller('api/v1/certificates')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
export class CertificatesController {
    constructor(private readonly certService: CertificatesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new medical certificate NFT' })
    @ApiResponse({ 
        status: 201, 
        description: 'The certificate has been successfully created',
        type: Certificate
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Invalid API key' })
    @ApiResponse({ status: 500, description: 'Internal server error or blockchain error' })
    async create(@Body() dto: CreateCertificateDto) {
        return this.certService.create(dto);
    }

    @Post('verify')
    @ApiOperation({ summary: 'Verify a medical certificate by its hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Certificate verification result',
        schema: {
            type: 'object',
            properties: {
                valid: {
                    type: 'boolean',
                    description: 'Whether the certificate is valid'
                },
                certificate: {
                    type: 'object',
                    description: 'Certificate details if found',
                    properties: {
                        id: { type: 'string' },
                        pdfHash: { type: 'string' },
                        type: { type: 'string' },
                        patientPublicKey: { type: 'string' },
                        nftTxHash: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Invalid API key' })
    async verify(@Body() dto: VerifyCertificateDto) {
        return this.certService.verify(dto.hash);
    }
}
