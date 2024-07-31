export class SpendBalance {
  balance: number;
  totalSpent: number;
  totalSpentByUser: number;
  totalSpentByOthers: number;

  constructor(data: SpendBalance) {
    this.balance = data.balance;
    this.totalSpent = data.totalSpent;
    this.totalSpentByUser = data.totalSpentByUser;
    this.totalSpentByOthers = data.totalSpentByOthers;
  }

  public static create(data: SpendBalance): SpendBalance {
    return new SpendBalance(data);
  }
}
