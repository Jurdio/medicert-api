import { Test, TestingModule } from '@nestjs/testing';
import { CertificatesController } from './certificates/certificates.controller';
import { CertificatesService } from './certificates/certificates.service';
import { BlockchainService } from './blockchain/blockchain.service';
import { PrismaService } from './prisma/prisma.service';

describe('CertificatesController', () => {
  let controller: CertificatesController;
  let service: CertificatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificatesController],
      providers: [
        CertificatesService,
        BlockchainService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<CertificatesController>(CertificatesController);
    service = module.get<CertificatesService>(CertificatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a certificate (mocked)', async () => {
    const dto = {
      pdfHash: 'abc123',
      type: 'fitness',
      patientPublicKey: 'wallet_123',
    };

    jest
        .spyOn(service['blockchainService'], 'mintNFT')
        .mockResolvedValue('mocked_tx_hash');

    jest
        .spyOn(service['prisma'], 'certificate')
        .mockReturnValue({
          create: async (args) => ({
            ...args.data,
            id: 'test-id',
            createdAt: new Date(),
          }),
        } as any);

    const result = await controller.create(dto as any);
    expect(result.nftTxHash).toBe('mocked_tx_hash');
    expect(result.pdfHash).toBe('abc123');
  });
});
