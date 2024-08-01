import { UserSummary } from '../user/user-summary';

export interface CreateSpendControlUser {
  user: UserSummary;
  isOwner: boolean;
  invitedAt: Date;
  joinedAt?: Date | null;
}

export class SpendControlUser {
  user: UserSummary;
  isOwner: boolean;
  invitedAt: Date;
  joinedAt: Date | null;

  constructor(data: CreateSpendControlUser) {
    this.user = UserSummary.create(data.user);
    this.isOwner = data.isOwner;
    this.invitedAt = data.invitedAt;
    this.joinedAt = data.joinedAt ?? null;
  }

  public static create(data: CreateSpendControlUser): SpendControlUser {
    return new SpendControlUser(data);
  }
}
