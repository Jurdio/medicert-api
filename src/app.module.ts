import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CertificatesService } from './certificates/certificates.service';
import { CertificatesController } from './certificates/certificates.controller';
import { SolanaService } from './blockchain/solana.service';
import { BlockchainService } from './blockchain/blockchain.service';
import { PrismaService } from './prisma/prisma.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        MINT_AUTHORITY_PRIVATE_KEY: Joi.string().required(),
        SOLANA_CLUSTER_API: Joi.string().default('https://api.devnet.solana.com'),
        PORT: Joi.number().default(3000),
        DEBUG: Joi.boolean().default(false),
      }),
    }),
  ],
  controllers: [CertificatesController],
  providers: [
    CertificatesService,
    BlockchainService,
    SolanaService,
    PrismaService,
  ],
})
export class AppModule {}
