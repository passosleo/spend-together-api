import CryptoJS from 'crypto-js';
import { config } from '../../../config/app.config';
import { IEncryptionHelper } from '../../../application/helpers/encryption/encryption-helper.types';
import { Exception } from '../../exception';

export class EncryptionHelper implements IEncryptionHelper {
  private readonly secret: string;

  constructor(secret?: string) {
    this.secret = secret || config.encryption.secret;
  }

  encrypt<T>(value: T) {
    return CryptoJS.AES.encrypt(JSON.stringify(value), this.secret).toString();
  }

  decrypt<T>(value: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(value, this.secret);
      const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decoded as T;
    } catch (error) {
      throw new Exception('BAD_REQUEST', 'Invalid token');
    }
  }
}
