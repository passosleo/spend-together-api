export interface IEncryptionHelper {
  encrypt<T>(value: T): string;
  decrypt<T>(value: string): T;
}
