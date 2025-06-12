import * as fs from 'fs';
import bs58 from 'bs58';

// Read the JSON file
const keyfileContent = fs.readFileSync('mint-authority.json', 'utf-8');
const privateKeyArray = JSON.parse(keyfileContent.replace(/\n/g, ''));

// Convert to base58
const privateKeyBytes = new Uint8Array(privateKeyArray);
const base58PrivateKey = bs58.encode(privateKeyBytes);

console.log('Base58 Private Key:', base58PrivateKey); 