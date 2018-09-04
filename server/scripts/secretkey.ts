import * as crypto from 'crypto';
import { writeFileSync } from 'fs';
import { Utilities } from '../utilities';

let config;

try {
    config = require('../../config.json');
} catch (e) {
    console.log('Config file not found, generating...');
    Utilities.generateConfig();
    console.log('Run this script again to apply a new secret key to your config.json file.');
    process.exit(e.code);
}

console.log('Generating pseudorandom secret key...')
crypto.randomBytes(32, (err, buffer) => {
    const token = buffer.toString('hex');
    config.token.secretKey = token;
    writeFileSync('./config.json', JSON.stringify(config, null, '\t'), 'utf8');
    console.log('Secret key saved to config.json');
});
