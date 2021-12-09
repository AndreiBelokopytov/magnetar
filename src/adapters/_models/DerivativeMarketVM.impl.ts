import { MarketVM, TokenVM } from "~/components";
import { AllChronosSpotMarketSummary } from "@injectivelabs/spot-consumer";
import { NumberFormatter } from "~/utils";
import { DerivativeMarket } from "@injectivelabs/derivatives-consumer";
import { MarketType } from "~/domain";

export class DerivativeMarketVMImpl implements MarketVM {
  get id() {
    return this._market.marketId;
  }

  get ticker() {
    return this._market.ticker;
  }

  get baseToken(): TokenVM {
    return {
      name: this._market.oracleBase,
      symbol: this._market.oracleBase,
    };
  }

  get quoteToken(): TokenVM {
    return {
      symbol: this._market.quoteToken?.symbol ?? "",
      name: this._market.quoteToken?.name ?? "",
      imageUrl: this._market.quoteToken?.logo,
    };
  }

  get change(): string {
    const formatter = new NumberFormatter({
      precision: 8,
      symbol: this.quoteToken.symbol,
    });
    return this._marketSummary ? formatter.format((this._marketSummary.price * this._marketSummary.change) / 100) : "";
  }

  get percentChange(): string {
    return this._marketSummary ? this._percentFormatter.format(this._marketSummary.change) : "";
  }

  get currentPrice(): string {
    const formatter = new NumberFormatter({
      precision: 4,
    });
    return this._marketSummary ? formatter.format(this._marketSummary.price) : "";
  }

  get volume() {
    const formatter = new NumberFormatter({
      precision: 2,
    });
    return formatter.format(this._marketSummary?.volume ?? 0);
  }

  get detailPageUrl() {
    return `/${MarketType.derivative}/${this.id}`;
  }

  readonly changePeriod = "past 24 hours";

  private readonly _percentFormatter = NumberFormatter.percent();

  constructor(
    private readonly _market: DerivativeMarket,
    private readonly _marketSummary?: AllChronosSpotMarketSummary
  ) {}
}
