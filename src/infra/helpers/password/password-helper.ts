import bc from 'bcryptjs';
import { IPasswordHelper } from '../../../application/helpers/password/password-helper.types';

export class PasswordHelper implements IPasswordHelper {
  async hashPassword(password: string) {
    const salt = await bc.genSalt(10);
    return bc.hash(password, salt);
  }

  async validateHashedPassword(password: string, hashedPassword: string) {
    return bc.compare(password, hashedPassword);
  }
}
