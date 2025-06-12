import bs58 from 'bs58';

const privateKey = [];
const base58PrivateKey = bs58.encode(Buffer.from(privateKey));
console.log('Base58 Private Key:', base58PrivateKey); 
