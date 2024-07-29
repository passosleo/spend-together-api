export class SpendCategory {
  spendCategoryId: string;
  name: string;
  description: string | null;
  color: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: SpendCategory) {
    this.spendCategoryId = data.spendCategoryId;
    this.name = data.name;
    this.description = data.description;
    this.color = data.color;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static create(data: SpendCategory): SpendCategory {
    return new SpendCategory(data);
  }
}
