import { MarketType } from "~/domain";
import { Period } from "~/utils";

export abstract class MarketHistoryQuery {
  abstract readonly symbol: string;
  abstract readonly marketType: MarketType;

  constructor(public readonly resolution: MarketHistoryResolution, public readonly period: Period) {}

  toString() {
    const boundaries = this.period.boundaries;
    const params = new URLSearchParams();
    params.append("symbol", this.symbol);
    params.append("resolution", this.resolution);
    params.append("from", Math.floor(boundaries.from.getTime() / 1000).toString());
    params.append("to", Math.floor(boundaries.to.getTime() / 1000).toString());
    return params.toString();
  }
}

export enum MarketHistoryResolution {
  min1 = "1",
  min3 = "3",
  min5 = "5",
  min15 = "15",
  min30 = "30",
  hour1 = "60",
  hour2 = "120",
  hour4 = "240",
  hour6 = "360",
  day1 = "d1",
  day = "d",
  week1 = "w1",
  week = "w",
}
