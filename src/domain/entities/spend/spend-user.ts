export interface CreateSpendUser {
  userId: string;
  username: string;
  name?: string | null;
  avatar?: string | null;
}

export class SpendUser {
  userId: string;
  username: string;
  name: string | null;
  avatar: string | null;

  constructor(data: CreateSpendUser) {
    this.userId = data.userId;
    this.username = data.username;
    this.name = data.name ?? null;
    this.avatar = data.avatar ?? null;
  }

  public static create(data: CreateSpendUser): SpendUser {
    return new SpendUser(data);
  }
}
