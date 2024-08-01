import { UserSummary } from '../user/user-summary';
import { SpendControlSummary } from '../spend-control/spend-control-summary';

export interface CreateSpendControlInvite {
  spendControlInviteId?: string;
  spendControlId: string;
  ownerUserId: string;
  invitedUserId: string;
  isAccepted?: boolean;
  isEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ownerUser?: UserSummary;
  invitedUser?: UserSummary;
  spendControl?: SpendControlSummary;
}

export class SpendControlInvite {
  spendControlInviteId: string;
  spendControlId: string;
  ownerUserId: string;
  invitedUserId: string;
  isAccepted: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerUser: UserSummary;
  invitedUser: UserSummary;
  spendControl: SpendControlSummary;

  constructor(data: CreateSpendControlInvite) {
    this.spendControlInviteId = data.spendControlInviteId!;
    this.spendControlId = data.spendControlId;
    this.ownerUserId = data.ownerUserId;
    this.invitedUserId = data.invitedUserId;
    this.isAccepted = data.isAccepted ?? false;
    this.isEnabled = data.isEnabled ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.ownerUser = data.ownerUser ? UserSummary.create(data.ownerUser) : ({} as UserSummary);
    this.invitedUser = data.invitedUser ? UserSummary.create(data.invitedUser) : ({} as UserSummary);
    this.spendControl = data.spendControl ? SpendControlSummary.create(data.spendControl) : ({} as SpendControlSummary);
  }

  public static create(data: CreateSpendControlInvite): SpendControlInvite {
    return new SpendControlInvite(data);
  }
}
