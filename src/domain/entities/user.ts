export interface CreateUserData {
  userId?: string;
  email: string;
  emailVerified?: boolean;
  name?: string | null;
  username: string;
  password: string;
  avatar?: string | null;
  receiveEmails?: boolean;
  isPublic?: boolean;
  isEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  userId: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  username: string;
  password: string;
  avatar: string | null;
  receiveEmails: boolean;
  isPublic: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CreateUserData) {
    this.userId = data.userId as string;
    this.email = data.email;
    this.emailVerified = data.emailVerified ?? false;
    this.name = data.name ?? null;
    this.username = data.username;
    this.password = data.password;
    this.avatar = data.avatar ?? null;
    this.receiveEmails = data.receiveEmails ?? true;
    this.isPublic = data.isPublic ?? true;
    this.isEnabled = data.isEnabled ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateUserData): User {
    return new User(data);
  }
}
