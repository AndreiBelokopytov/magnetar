import { MarketVM, TokenVM } from "~/components";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { NumberFormatter } from "~/utils";
import { MarketType } from "~/domain";
import { SubaccountBalance } from "@injectivelabs/subaccount-consumer";

export class SpotMarketVMImpl implements MarketVM {
  get id() {
    return this._market.marketId;
  }

  get ticker() {
    return this._market.ticker;
  }

  get baseToken(): TokenVM {
    return {
      symbol: this._market.baseToken?.symbol ?? "",
      name: this._market.baseToken?.name ?? "",
      imageUrl: this._market.baseToken?.logo,
      balance: this._baseTokenBalance?.deposit?.availableBalance ?? "",
    };
  }

  get quoteToken(): TokenVM {
    return {
      symbol: this._market.quoteToken?.symbol ?? "",
      name: this._market.quoteToken?.name ?? "",
      imageUrl: this._market.quoteToken?.logo,
      balance: this._quoteTokenBalance?.deposit?.availableBalance ?? "",
    };
  }

  get change(): string {
    const formatter = new NumberFormatter({
      precision: 8,
      symbol: this.quoteToken.symbol,
    });

    return this._marketSummary ? formatter.format(this._marketSummary.price * this._marketSummary.change) : "";
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
    return `/${MarketType.spot}/${this.id}`;
  }

  readonly changePeriod = "past 24 hours";

  private readonly _percentFormatter = NumberFormatter.percent();

  constructor(
    private readonly _market: SpotMarket,
    private readonly _marketSummary?: AllChronosSpotMarketSummary,
    private readonly _baseTokenBalance?: SubaccountBalance,
    private readonly _quoteTokenBalance?: SubaccountBalance
  ) {}
}
