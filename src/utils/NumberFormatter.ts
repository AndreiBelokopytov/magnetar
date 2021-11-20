type NumberFormatterOptions = {
  locale?: string;
  precision?: number;
  useGrouping?: boolean;
  addSign?: boolean;
  truncate?: boolean;
  symbol?: string;
  denseSymbol?: boolean;
};

export class NumberFormatter {
  static percent() {
    return new NumberFormatter({
      precision: 2,
      useGrouping: false,
      symbol: "%",
      denseSymbol: true,
    });
  }

  locale: string;
  precision: number;
  useGrouping?: boolean;
  addSign?: boolean;
  truncate?: boolean;
  symbol?: string;
  denseSymbol?: boolean;

  constructor(options: NumberFormatterOptions = {}) {
    this.locale = options.locale ?? "ru-RU";
    this.precision = options.precision ?? 2;
    this.useGrouping = options.useGrouping ?? true;
    this.addSign = options.addSign;
    this.truncate = options.truncate;
    this.symbol = options.symbol;
    this.denseSymbol = options.denseSymbol;
  }

  format(value: number) {
    let sign = "";
    if (this.addSign) {
      sign = value > 0 || this._isEqualToZero(value) ? "+" : "";
    }

    const roundedValue = Math.round(value * 10 ** this.precision);
    if (roundedValue === 0) {
      value = 0;
    }

    const formatted = value.toLocaleString(this.locale, {
      useGrouping: this.useGrouping,
      minimumFractionDigits: this.precision,
      maximumFractionDigits: this.precision,
    });

    const symbol = this.symbol ? (this.denseSymbol ? this.symbol : " " + this.symbol) : "";

    return `${sign}${formatted}${symbol}`;
  }

  private _isEqualToZero(value: number) {
    return Math.abs(value) < Math.pow(10, -9);
  }
}
