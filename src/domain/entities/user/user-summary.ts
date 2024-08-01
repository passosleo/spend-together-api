export interface CreateUserSummary {
  userId: string;
  username: string;
  name?: string | null;
  avatar?: string | null;
}

export class UserSummary {
  userId: string;
  username: string;
  name: string | null;
  avatar: string | null;

  constructor(data: CreateUserSummary) {
    this.userId = data.userId;
    this.username = data.username;
    this.name = data.name ?? null;
    this.avatar = data.avatar ?? null;
  }

  public static create(data: CreateUserSummary): UserSummary {
    return new UserSummary(data);
  }
}
