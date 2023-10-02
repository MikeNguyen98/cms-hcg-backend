import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { promisify } from 'util';

const encryptString = async (string: string) => {
  const configService = new ConfigService();
  const password = configService.get('ENCRYPTION_PASSWORD');
  const iv = Buffer.from(password);
  const key = (await promisify(crypto.scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([cipher.update(string), cipher.final()]);
  // console.log('key: ', key);
  return encryptedText.toString('hex');
};
const decryptString = async (string: string) => {
  const configService = new ConfigService();
  const password = configService.get('ENCRYPTION_PASSWORD');
  const iv = Buffer.from(password);
  const key = (await promisify(crypto.scrypt)(password, 'salt', 32)) as Buffer;
  // console.log('key: ', key);
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(string, 'hex')),
    decipher.final(),
  ]);
  return decryptedText.toString();
};

export { encryptString, decryptString };
