import { SpendCategory } from '../spend-category/spend-category';
import { SpendUser } from './spend-user';

export interface CreateSpend {
  spendId?: string;
  spendControlId: string;
  spendCategoryId: string;
  userId: string;
  description?: string | null;
  amount: number;
  isEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  spendCategory?: SpendCategory;
  user?: SpendUser;
}

export class Spend {
  spendId: string;
  spendControlId: string;
  spendCategoryId: string;
  userId: string;
  description: string | null;
  amount: number;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  spendCategory: SpendCategory;
  user: SpendUser;

  constructor(data: CreateSpend) {
    this.spendId = data.spendId!;
    this.spendControlId = data.spendControlId;
    this.spendCategoryId = data.spendCategoryId;
    this.userId = data.userId;
    this.description = data.description ?? null;
    this.amount = data.amount;
    this.isEnabled = data.isEnabled ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.spendCategory = data.spendCategory ? SpendCategory.create(data.spendCategory) : ({} as SpendCategory);
    this.user = data.user ? SpendUser.create(data.user) : ({} as SpendUser);
  }

  public static create(data: CreateSpend): Spend {
    return new Spend(data);
  }
}
