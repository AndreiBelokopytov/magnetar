import { MarketListItemVM } from "~/components";

export const marketListMock: MarketListItemVM[] = [
  {
    id: "1",
    quoteSymbol: "BTC",
    ticker: "BTC/USDT PERP",
    lastPrice: "60,657.4",
    change: "-0.08%",
    detailPageUrl: "/spot/1",
    volume: "5956.05",
  },
  {
    id: "2",
    quoteSymbol: "WETH",
    ticker: "WETH/USDT",
    lastPrice: "4,469.177",
    change: "0.02%",
    detailPageUrl: "/spot/2",
    volume: "5956.05",
  },
  {
    id: "3",
    quoteSymbol: "BTC",
    ticker: "BTC/USDT",
    lastPrice: "60,966.04",
    change: "0.04%",
    detailPageUrl: "/spot/3",
    volume: "5956.05",
  },
];
