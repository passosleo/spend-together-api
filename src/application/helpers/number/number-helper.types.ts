export interface INumberHelper {
  codeGenerator(length?: number, asString?: boolean): number | string;
  formatDecimal(value: number | string): number;
}
