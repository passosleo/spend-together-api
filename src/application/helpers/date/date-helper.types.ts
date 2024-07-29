export interface Expiration {
  minutes?: number;
  hours?: number;
  days?: number;
}

export interface IDateHelper {
  formatDate(date: string): string;
  date(): string;
  formatedDate(): string;
  thirtyDaysAgo(): string;
  datetime(): string;
  oneHourForward(): string;
  actualMonth(): number;
  calculateExpiration({ minutes, hours, days }: Expiration): Date;
  isExpiredDate(date: Date | string): boolean;
}
