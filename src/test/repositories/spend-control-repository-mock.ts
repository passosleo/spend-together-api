import { ISpendControlRepository } from '../../domain/repositories/spend-control/spend-control-repository';
import { SpendControl } from '../../domain/entities/spend-control/spend-control';

export const SpendControlRepositoryMock: jest.Mocked<ISpendControlRepository> = {
  findOne: jest.fn<Promise<SpendControl | null>, [string, string]>(),
  findAll: jest.fn<Promise<SpendControl[]>, [string]>(),
  create: jest.fn<Promise<SpendControl>, [SpendControl]>(),
  update: jest.fn<Promise<SpendControl>, [string, string, Partial<SpendControl>]>(),
  delete: jest.fn<Promise<SpendControl>, [string]>(),
};
