import { MarketListItemVM } from "~/components";
import { MarketType } from "~/domain";
import { AllChronosDerivativeMarketSummary, DerivativeMarket } from "@injectivelabs/derivatives-consumer";
import { NumberFormatter } from "~/utils";

export class DerivativeMarketListItemVMImpl implements MarketListItemVM {
  get id() {
    return this._market.marketId;
  }

  get ticker() {
    return this._market.ticker;
  }

  get imageUrl() {
    return "";
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
    return `/${MarketType.derivative}/${this.id}`;
  }

  constructor(
    private readonly _market: DerivativeMarket,
    private readonly _marketSummary?: AllChronosDerivativeMarketSummary
  ) {}
}
