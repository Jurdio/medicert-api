import { Injectable } from '@nestjs/common';
import {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
} from '@solana/web3.js';
import { Metaplex, Nft, Sft, NftWithToken, SftWithToken, toMetaplexFile } from '@metaplex-foundation/js';
import bs58 from 'bs58';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from '../config/configuration';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SolanaService {
    private connection: Connection;
    private metaplex: Metaplex;
    private mintAuthority: Keypair;

    constructor(private configService: ConfigService) {
        const clusterApi = this.configService.get<string>('solana.clusterApi');
        this.connection = new Connection(clusterApi || clusterApiUrl('devnet'), 'confirmed');
        this.metaplex = new Metaplex(this.connection);
    
        const privateKey = process.env.MINT_AUTHORITY_PRIVATE_KEY;
        console.log('[DEBUG] Private key from env:', privateKey); // ⬅️ додай це
        if (!privateKey) {
            throw new Error('MINT_AUTHORITY_PRIVATE_KEY is not configured');
        }

        try {
            const privateKeyBytes = bs58.decode(privateKey);
            this.mintAuthority = Keypair.fromSecretKey(privateKeyBytes);
            console.log('Mint authority public key:', this.mintAuthority.publicKey.toBase58());
        } catch (error) {
            console.error('Error initializing mint authority:', error);
            throw new Error('Failed to initialize mint authority: ' + error.message);
        }
    }

    async mintNFT(
        recipientAddress: string,
        metadata: {
            name: string;
            symbol: string;
            description: string;
            image: string;
            attributes: Array<{ trait_type: string; value: string }>;
        },
    ) {
        try {
            if (!this.mintAuthority) {
                throw new Error('Mint authority not configured');
            }

            const recipient = new PublicKey(recipientAddress);

            // Create NFT using Metaplex
            const { nft } = await this.metaplex
                .nfts()
                .create({
                    uri: metadata.image, // URI to the JSON metadata
                    name: metadata.name,
                    sellerFeeBasisPoints: 0,
                    symbol: metadata.symbol,
                    creators: [
                        {
                            address: this.mintAuthority.publicKey,
                            share: 100,
                            authority: this.mintAuthority,
                        },
                    ],
                    isMutable: false,
                    maxSupply: 1,
                });

            // Transfer NFT to recipient
            const tx = await this.metaplex
                .nfts()
                .transfer({
                    nftOrSft: nft,
                    authority: this.mintAuthority,
                    fromOwner: this.mintAuthority.publicKey,
                    toOwner: recipient,
                });

            return {
                mint: nft.address.toBase58(),
                recipient: recipient.toBase58(),
                transaction: tx
            };
        } catch (error) {
            console.error('Error minting NFT:', error);
            throw new Error(`Failed to mint NFT: ${error.message}`);
        }
    }

    async verifyNFTOwnership(nftMint: string, ownerAddress: string): Promise<boolean> {
        try {
            const mintAddress = new PublicKey(nftMint);
            const nft = await this.metaplex.nfts().findByMint({ mintAddress });
            
            // Handle different NFT types
            if ('token' in nft) {
                return nft.token.ownerAddress.toBase58() === ownerAddress;
            }
            
            return false;
        } catch (error) {
            console.error('Error verifying NFT ownership:', error);
            return false;
        }
    }
} 