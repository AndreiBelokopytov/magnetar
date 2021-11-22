import { MarketDetailVM } from "~/components";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { NumberFormatter } from "~/utils";

export class SpotMarketDetailVMImpl implements MarketDetailVM {
  get id() {
    return this._market.marketId;
  }

  get baseToken(): string {
    return this._market.baseToken?.symbol ?? "";
  }

  get quoteToken(): string {
    return this._market.quoteToken?.symbol ?? "";
  }

  get change(): string {
    const formatter = new NumberFormatter({
      precision: 8,
      symbol: this.quoteToken,
    });

    return formatter.format(this._marketSummary.price * this._marketSummary.change);
  }

  get percentChange(): string {
    return this._percentFormatter.format(this._marketSummary.change);
  }

  get currentPrice(): string {
    const formatter = new NumberFormatter({
      precision: 4,
      symbol: this.quoteToken,
    });
    return formatter.format(this._marketSummary.price);
  }

  readonly changePeriod = "past 24 hours";

  private readonly _percentFormatter = NumberFormatter.percent();

  constructor(private readonly _market: SpotMarket, private readonly _marketSummary: AllChronosSpotMarketSummary) {}
}