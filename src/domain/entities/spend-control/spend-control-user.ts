export interface CreateSpendControlUser {
  user: {
    userId: string;
    username: string;
    name?: string | null;
    avatar?: string | null;
  };
  isOwner: boolean;
  invitedAt: Date;
  joinedAt?: Date | null;
}

export class SpendControlUser {
  user: {
    userId: string;
    username: string;
    name: string | null;
    avatar: string | null;
  };
  isOwner: boolean;
  invitedAt: Date;
  joinedAt: Date | null;

  constructor(data: CreateSpendControlUser) {
    this.user = {
      userId: data.user.userId,
      username: data.user.username,
      name: data.user.name ?? null,
      avatar: data.user.avatar ?? null,
    };
    this.isOwner = data.isOwner;
    this.invitedAt = data.invitedAt;
    this.joinedAt = data.joinedAt ?? null;
  }

  public static create(data: CreateSpendControlUser): SpendControlUser {
    return new SpendControlUser(data);
  }
}
