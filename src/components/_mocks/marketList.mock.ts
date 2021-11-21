import { MarketListItemVM } from "~/components";

export const marketListMock: MarketListItemVM[] = [
  {
    id: "1",
    ticker: "Bitcoin",
    pair: "BTC/USDT PERP",
    lastPrice: "60,657.4",
    change: "-0.08%",
    detailPageUrl: "/spot/1",
  },
  {
    id: "2",
    ticker: "WETH",
    pair: "WETH/USDT",
    lastPrice: "4,469.177",
    change: "0.02%",
    detailPageUrl: "/spot/2",
  },
  {
    id: "3",
    ticker: "Wrapped Bitcoin",
    pair: "WBTC/USDC",
    lastPrice: "60,966.04",
    change: "0.04%",
    detailPageUrl: "/spot/3",
  },
];
