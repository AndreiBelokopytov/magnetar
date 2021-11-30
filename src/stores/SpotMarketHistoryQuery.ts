import { MarketType } from "~/domain";
import { SpotMarket } from "@injectivelabs/spot-consumer";
import { MarketHistoryQuery, MarketHistoryResolution } from "~/stores/MarketHistoryQuery";
import { Period } from "~/utils";

export class SpotMarketHistoryQuery extends MarketHistoryQuery {
  readonly marketType = MarketType.spot;

  get symbol(): string {
    const ticker = `${this._market.baseDenom}/${this._market.quoteDenom}`;
    return ticker.replace("ibc/", "ibc@");
  }

  constructor(private readonly _market: SpotMarket, resolution: MarketHistoryResolution, period: Period) {
    super(resolution, period);
  }
}
