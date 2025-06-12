export interface EnvironmentConfig {
  solana: {
    mintAuthorityPrivateKey: string;
    clusterApi: string;
  };
  port: number;
  debug: boolean;
}

export default (): EnvironmentConfig => ({
  solana: {
    mintAuthorityPrivateKey: process.env.MINT_AUTHORITY_PRIVATE_KEY ?? '',
    clusterApi: process.env.SOLANA_CLUSTER_API ?? 'https://api.devnet.solana.com',
  },
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  debug: process.env.DEBUG === 'true',
}); 