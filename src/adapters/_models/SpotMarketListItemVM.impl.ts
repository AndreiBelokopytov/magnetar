import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { MarketListItemVM } from "~/components";
import { MarketType } from "~/domain";
import { NumberFormatter } from "~/utils";

export class SpotMarketListItemVMImpl implements MarketListItemVM {
  get id() {
    return this._market.marketId;
  }

  get ticker() {
    return this._market.ticker;
  }

  get imageUrl() {
    return this._market.baseToken?.logo;
  }

  get quoteSymbol() {
    return this._market.quoteToken?.symbol ?? "";
  }

  get volume() {
    const formatter = new NumberFormatter({
      precision: 2,
    });
    return formatter.format(this._marketSummary?.volume ?? 0);
  }

  get lastPrice() {
    const formatter = new NumberFormatter({
      precision: 6,
    });
    return formatter.format(this._marketSummary?.price ?? 0);
  }

  get change() {
    const formatter = new NumberFormatter({
      precision: 2,
      addSign: true,
      symbol: "%",
    });
    return formatter.format(this._marketSummary?.change ?? 0);
  }

  get detailPageUrl() {
    return `/${MarketType.spot}/${this.id}`;
  }

  constructor(private readonly _market: SpotMarket, private readonly _marketSummary?: AllChronosSpotMarketSummary) {}
}
