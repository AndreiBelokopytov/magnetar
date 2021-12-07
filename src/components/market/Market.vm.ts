import { TokenVM } from "~/components";

export interface MarketVM {
  id: string;
  ticker: string;
  baseToken: TokenVM;
  quoteToken: TokenVM;
  currentPrice: string;
  volume: string;
  change: string;
  percentChange: string;
  changePeriod: string;
  detailPageUrl: string;
}
