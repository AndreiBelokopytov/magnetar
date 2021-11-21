import { MarketDetailVM } from "~/components";
import { AllChronosSpotMarketSummary } from "@injectivelabs/spot-consumer";
import { NumberFormatter } from "~/utils";
import { DerivativeMarket } from "@injectivelabs/derivatives-consumer";

export class DerivativeMarketDetailVMImpl implements MarketDetailVM {
  get id() {
    return this._market.marketId;
  }

  get baseToken(): string {
    return "";
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

  constructor(
    private readonly _market: DerivativeMarket,
    private readonly _marketSummary: AllChronosSpotMarketSummary
  ) {}
}
