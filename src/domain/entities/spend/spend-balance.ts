export interface CreateSpendBalanceData {
  balance?: number;
  totalSpent?: number;
  totalSpentByUser?: number;
  totalSpentByOthers?: number;
}

export class SpendBalance {
  balance: number;
  totalSpent: number;
  totalSpentByUser: number;
  totalSpentByOthers: number;

  constructor(data: CreateSpendBalanceData = {}) {
    this.balance = data.balance ?? 0;
    this.totalSpent = data.totalSpent ?? 0;
    this.totalSpentByUser = data.totalSpentByUser ?? 0;
    this.totalSpentByOthers = data.totalSpentByOthers ?? 0;
  }

  public static create(data?: CreateSpendBalanceData): SpendBalance {
    return new SpendBalance(data);
  }
}
