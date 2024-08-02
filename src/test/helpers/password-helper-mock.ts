import { IPasswordHelper } from '../../application/helpers/password/password-helper.types';

export const PasswordHelperMock: jest.Mocked<IPasswordHelper> = {
  hashPassword: jest.fn<Promise<string>, [string]>(),
  validateHashedPassword: jest.fn<Promise<boolean>, [string, string]>(),
};
