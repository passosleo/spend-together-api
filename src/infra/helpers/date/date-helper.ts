import moment from 'moment';
import { Expiration, IDateHelper } from '../../../application/helpers/date/date-helper.types';

export class DateHelper implements IDateHelper {
  formatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  date() {
    return moment().format('YYYY-MM-DD');
  }

  formatedDate() {
    return moment().format('DD/MM/YYYY');
  }

  thirtyDaysAgo() {
    return moment().subtract(30, 'days').format('YYYY-MM-DD');
  }

  datetime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  oneHourForward() {
    return moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
  }

  actualMonth() {
    return moment().month() + 1;
  }

  calculateExpiration({ minutes, hours, days }: Expiration) {
    const expiresAt = new Date();

    if (minutes) expiresAt.setMinutes(expiresAt.getMinutes() + minutes);

    if (hours) expiresAt.setHours(expiresAt.getHours() + hours);

    if (days) expiresAt.setDate(expiresAt.getDate() + days);

    return expiresAt;
  }

  isExpiredDate(date: Date | string) {
    return moment(date).isBefore(moment());
  }
}
