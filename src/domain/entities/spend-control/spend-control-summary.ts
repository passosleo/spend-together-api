export class SpendControlSummary {
  spendControlId: string;
  name: string;
  description: string | null;
  color: string | null;

  constructor(data: SpendControlSummary) {
    this.spendControlId = data.spendControlId;
    this.name = data.name;
    this.description = data.description ?? null;
    this.color = data.color ?? null;
  }

  public static create(data: SpendControlSummary): SpendControlSummary {
    return new SpendControlSummary(data);
  }
}
