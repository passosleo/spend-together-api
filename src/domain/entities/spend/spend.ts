import { SpendCategory } from '../spend-category/spend-category';
import { UserSummary } from '../user/user-summary';

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
  user?: UserSummary;
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
  user: UserSummary;

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
    this.user = data.user ? UserSummary.create(data.user) : ({} as UserSummary);
  }

  public static create(data: CreateSpend): Spend {
    return new Spend(data);
  }
}
