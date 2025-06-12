import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from '../certificates/dto/create-certificate.dto';
import { SolanaService } from './solana.service';

@Injectable()
export class BlockchainService {
    constructor(private readonly solanaService: SolanaService) {}

    async mintNFT(dto: CreateCertificateDto): Promise<string> {
        const metadata = {
            name: `Medical Certificate - ${dto.type}`,
            symbol: 'MEDCERT',
            description: `Medical certificate of type ${dto.type}`,
            image: `https://arweave.net/your-metadata-uri`, // You'll need to implement metadata storage
            attributes: [
                { trait_type: 'Type', value: dto.type },
                { trait_type: 'Hash', value: dto.pdfHash },
            ],
        };

        const result = await this.solanaService.mintNFT(
            dto.patientPublicKey,
            metadata,
        );

        return result.mint;
    }

    async verifyNFT(hash: string): Promise<boolean> {
        // Implementation will depend on how you want to verify the certificate
        // You might want to look up the NFT by its metadata (hash) and verify ownership
        return true;
    }
}
