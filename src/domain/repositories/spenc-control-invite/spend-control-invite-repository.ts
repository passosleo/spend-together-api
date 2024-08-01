import { SpendControlInvite } from '../../entities/spend-control-invite/spend-control-invite';

export interface ISpendControlInviteRepository {
  findOne(spendControlInviteId: string, userId: string): Promise<SpendControlInvite | null>;
  findAll(userId: string): Promise<SpendControlInvite[]>;
  create(data: SpendControlInvite): Promise<SpendControlInvite>;
  update(spendControlInviteId: string, userId: string, data: Partial<SpendControlInvite>): Promise<SpendControlInvite>;
}
