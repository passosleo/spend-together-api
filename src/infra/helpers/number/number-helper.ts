import { INumberHelper } from '../../../application/helpers/number';

export class NumberHelper implements INumberHelper {
  codeGenerator(length = 6, asString = false) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const value = Math.floor(Math.random() * (max - min + 1)) + min;

    return asString ? value.toString() : value;
  }

  formatDecimal(value: number) {
    return Number(value.toFixed(2));
  }
}
