import { ISpendControlInviteRepository } from '../../domain/repositories/spenc-control-invite/spend-control-invite-repository';
import { SpendControlInvite } from '../../domain/entities/spend-control-invite/spend-control-invite';

export const SpendControlInviteRepositoryMock: jest.Mocked<ISpendControlInviteRepository> = {
  findOne: jest.fn<Promise<SpendControlInvite | null>, [string, string]>(),
  findAll: jest.fn<Promise<SpendControlInvite[]>, [string]>(),
  create: jest.fn<Promise<SpendControlInvite>, [SpendControlInvite]>(),
  update: jest.fn<Promise<SpendControlInvite>, [string, string, Partial<SpendControlInvite>]>(),
};
