import { ISpendCalculatorService } from '../../application/services/spend/spend-calculator-service.types';
import { SpendControl } from '../../domain/entities/spend-control/spend-control';
import { SpendBalance } from '../../domain/entities/spend/spend-balance';

export const SpendCalculatorServiceMock: jest.Mocked<ISpendCalculatorService> = {
  calculateBalance: jest.fn<Promise<SpendBalance>, [SpendControl, string]>(),
};
