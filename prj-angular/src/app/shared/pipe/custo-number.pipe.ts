import { stringify } from '@angular/compiler/src/util';
import { Inject, LOCALE_ID, Pipe, PipeTransform, Type } from '@angular/core';
import { DecimalPipe, formatNumber } from '@angular/common';

@Pipe({
  name: 'custoNumber'
})
export class CustoNumberPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) { }

  /**
   * @param value The number to be formatted.
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `0`.
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `3`.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
   */
  // transform(value: number | string, digitsInfo?: string, locale?: string): string | null;

  // transform(value: null | undefined, digitsInfo?: string, locale?: string): null;

  // transform(value: number | string | null | undefined, digitsInfo?: string, locale?: string): string | null;

  transform(value: number | string | null | undefined, digitsInfo?: string, locale?: string): string | null {

    if (!isValue(value)) return null;

    locale = locale || this._locale;

    try {
      const num = strToNumber(value);
      return formatNumber(num, locale, digitsInfo);
    } catch (error) {
      throw invalidPipeArgumentError(DecimalPipe, error.message);
    }
  }
}


function isValue(value: number | string | null | undefined): value is number | string {
  return !(value == null || value === '' || value !== value);
}

/**
 * Transforms a string into a number (if needed).
 */
function strToNumber(value: number | string): number {
  // Convert strings to numbers
  if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
    return Number(value);
  }
  if (typeof value !== 'number') {
    throw new Error(`${value} is not a number`);
  }
  return value;
}

export function invalidPipeArgumentError(type: Type<any>, value: Object) {
  return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}

