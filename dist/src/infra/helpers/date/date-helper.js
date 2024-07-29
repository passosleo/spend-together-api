"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
const moment_1 = __importDefault(require("moment"));
class DateHelper {
    formatDate(date) {
        return (0, moment_1.default)(date).format('YYYY-MM-DD');
    }
    date() {
        return (0, moment_1.default)().format('YYYY-MM-DD');
    }
    formatedDate() {
        return (0, moment_1.default)().format('DD/MM/YYYY');
    }
    thirtyDaysAgo() {
        return (0, moment_1.default)().subtract(30, 'days').format('YYYY-MM-DD');
    }
    datetime() {
        return (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
    }
    oneHourForward() {
        return (0, moment_1.default)().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
    }
    actualMonth() {
        return (0, moment_1.default)().month() + 1;
    }
    calculateExpiration({ minutes, hours, days }) {
        const expiresAt = new Date();
        if (minutes)
            expiresAt.setMinutes(expiresAt.getMinutes() + minutes);
        if (hours)
            expiresAt.setHours(expiresAt.getHours() + hours);
        if (days)
            expiresAt.setDate(expiresAt.getDate() + days);
        return expiresAt;
    }
    isExpiredDate(date) {
        return (0, moment_1.default)(date).isBefore((0, moment_1.default)());
    }
}
exports.DateHelper = DateHelper;
