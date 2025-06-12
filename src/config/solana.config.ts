import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

console.log('Environment variables check:');
console.log('SOLANA_CLUSTER_API:', process.env.SOLANA_CLUSTER_API);
console.log('MINT_AUTHORITY_PRIVATE_KEY:', process.env.MINT_AUTHORITY_PRIVATE_KEY ? 'Present' : 'Missing');

@Injectable()
export class SolanaConfig {
    constructor(private configService: ConfigService) {}

    get clusterApi(): string {
        return this.configService.get<string>('env.solanaClusterApi') || clusterApiUrl('devnet');
    }

    get mintAuthorityPrivateKey(): string | undefined {
        return this.configService.get<string>('env.mintAuthorityPrivateKey');
    }

    getConnection(): Connection {
        return new Connection(this.clusterApi, 'confirmed');
    }
}

export const SOLANA_CONFIG = {
    CLUSTER_API: process.env.SOLANA_CLUSTER_API || clusterApiUrl('devnet'),
    NFT_STORAGE_KEY: process.env.NFT_STORAGE_KEY || '',
    MINT_AUTHORITY_PRIVATE_KEY: process.env.MINT_AUTHORITY_PRIVATE_KEY || '',
};

export const getSolanaConnection = () => {
    return new Connection(SOLANA_CONFIG.CLUSTER_API, 'confirmed');
}; 