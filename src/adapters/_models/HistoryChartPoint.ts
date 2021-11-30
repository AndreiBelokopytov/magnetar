import { LineChartPoint } from "~/components";
import { MarketPrice } from "~/domain";
import intlFormat from "date-fns/intlFormat";

export class HistoryChartPoint implements LineChartPoint {
  get x() {
    return this._price.timestamp;
  }

  get y() {
    return this._price.close;
  }

  get label() {
    const date = intlFormat(
      new Date(this._price.timestamp * 1000),
      {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
      {
        locale: navigator.language,
      }
    );
    return `${this.y} ${date}`;
  }

  constructor(private readonly _price: MarketPrice) {}
}
