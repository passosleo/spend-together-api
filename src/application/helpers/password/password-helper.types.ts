export interface IPasswordHelper {
  hashPassword(password: string): Promise<string>;
  validateHashedPassword(password: string, hashedPassword: string): Promise<boolean>;
}
