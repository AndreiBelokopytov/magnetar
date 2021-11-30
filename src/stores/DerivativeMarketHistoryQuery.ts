import { MarketHistoryQuery, MarketHistoryResolution } from "~/stores/MarketHistoryQuery";
import { DerivativeMarket } from "@injectivelabs/derivatives-consumer";
import { MarketType } from "~/domain";
import { Period } from "~/utils";

export class DerivativeMarketHistoryQuery extends MarketHistoryQuery {
  readonly marketType = MarketType.derivative;

  get symbol(): string {
    return this._market.ticker;
  }

  constructor(private readonly _market: DerivativeMarket, resolution: MarketHistoryResolution, period: Period) {
    super(resolution, period);
  }
}
