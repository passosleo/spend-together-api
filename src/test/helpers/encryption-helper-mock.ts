import { IEncryptionHelper } from '../../application/helpers/encryption/encryption-helper.types';

export const EncryptionHelperMock: jest.Mocked<IEncryptionHelper> = {
  decrypt: jest.fn<any, [string]>(),
  encrypt: jest.fn<string, [any]>(),
};
