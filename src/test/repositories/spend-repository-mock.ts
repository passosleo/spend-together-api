import { Spend } from '../../domain/entities/spend/spend';
import { ISpendRepository } from '../../domain/repositories/spend/spend-repository';

export const SpendRepositoryMock: jest.Mocked<ISpendRepository> = {
  findOne: jest.fn<Promise<Spend | null>, [string, string]>(),
  findAll: jest.fn<Promise<Spend[]>, [string, string]>(),
  create: jest.fn<Promise<Spend>, [Spend]>(),
  update: jest.fn<Promise<Spend>, [string, Partial<Spend>]>(),
  delete: jest.fn<Promise<Spend>, [string, string]>(),
  sumTotalSpent: jest.fn<Promise<number>, [string, string?]>(),
};
