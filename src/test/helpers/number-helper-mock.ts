import { INumberHelper } from '../../application/helpers/number/number-helper.types';

export const NumberHelperMock: jest.Mocked<INumberHelper> = {
  codeGenerator: jest.fn<number | string, [number?, boolean?]>(),
  formatDecimal: jest.fn<number, [number | string]>(),
};
