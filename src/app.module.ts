import { Module } from '@nestjs/common';

import { CertificatesService } from './certificates/certificates.service';
import { CertificatesController } from './certificates/certificates.controller';
import { BlockchainService } from './blockchain/blockchain.service';
import { PrismaService } from './prisma/prisma.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [CertificatesController],
  providers: [
    CertificatesService,
    BlockchainService,
    PrismaService,
  ],
})
export class AppModule {}
