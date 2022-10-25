import { randomBytes, createHmac } from 'crypto';

export class AuthUtil {
  static createSalt() {
    return randomBytes(16).toString('hex');
  }

  static createHash(password: string, salt: string) {
    return createHmac('sha512', salt).update(password).digest('hex');
  }
}
