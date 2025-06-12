const bs58 = require('bs58');
const fs = require('fs');

const rawKey = fs.readFileSync('./mint-authority.json');
const keyArray = JSON.parse(rawKey);
const uint8Array = new Uint8Array(keyArray);
const base58Key = bs58.encode(uint8Array);
console.log('Base58 encoded key:', base58Key); 