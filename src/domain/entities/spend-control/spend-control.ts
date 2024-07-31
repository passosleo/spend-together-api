import { SpendControlUser } from './spend-control-user';

export interface CreateSpendControlData {
  spendControlId?: string;
  name: string;
  color?: string | null;
  description?: string | null;
  isEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  users?: SpendControlUser[];
}

export class SpendControl {
  spendControlId: string;
  name: string;
  description: string | null;
  color: string | null;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  users: SpendControlUser[];

  constructor(data: CreateSpendControlData) {
    this.spendControlId = data.spendControlId!;
    this.name = data.name;
    this.description = data.description ?? null;
    this.color = data.color ?? null;
    this.isEnabled = data.isEnabled ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.users = (data.users ?? []).map((user) => SpendControlUser.create(user));
  }

  public static create(data: CreateSpendControlData): SpendControl {
    return new SpendControl(data);
  }
}
