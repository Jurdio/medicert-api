import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { BlockchainService } from '../blockchain/blockchain.service';
import { PrismaService } from '../prisma/prisma.service'; // імпорт


@Injectable()
export class CertificatesService {
    constructor(
        private blockchainService: BlockchainService,
        private prisma: PrismaService // додано
    ) {}

    async create(dto: CreateCertificateDto) {
        const txHash = await this.blockchainService.mintNFT(dto);

        const created = await this.prisma.certificate.create({
            data: {
                pdfHash: dto.pdfHash,
                type: dto.type,
                patientPublicKey: dto.patientPublicKey,
                nftTxHash: txHash,
            },
        });

        return created;
    }

    async verify(hash: string) {
        const cert = await this.prisma.certificate.findFirst({
            where: { pdfHash: hash },
        });

        return {
            valid: !!cert,
            certificate: cert ?? null,
        };
    }
}
