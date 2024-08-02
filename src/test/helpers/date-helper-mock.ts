import { Expiration, IDateHelper } from '../../application/helpers/date/date-helper.types';

export const DateHelpersMock: jest.Mocked<IDateHelper> = {
  formatDate: jest.fn<string, [string]>(),
  date: jest.fn<string, []>(),
  formatedDate: jest.fn<string, []>(),
  thirtyDaysAgo: jest.fn<string, []>(),
  datetime: jest.fn<string, []>(),
  oneHourForward: jest.fn<string, []>(),
  actualMonth: jest.fn<number, []>(),
  calculateExpiration: jest.fn<Date, [Expiration]>(),
  isExpiredDate: jest.fn<boolean, [Date | string]>(),
};
