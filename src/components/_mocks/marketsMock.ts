import { MarketVM } from "~/components";

export const marketsMock: MarketVM[] = [
  {
    id: "1",
    quoteToken: {
      symbol: "BTC",
      name: "Bitcoin",
    },
    baseToken: {
      symbol: "USDT",
      name: "USDT",
    },
    ticker: "BTC/USDT PERP",
    currentPrice: "60,657.4",
    change: "-4,852.592",
    percentChange: "-0.08%",
    changePeriod: "24 hours",
    detailPageUrl: "/spot/1",
    volume: "5956.05",
  },
  {
    id: "2",
    quoteToken: {
      symbol: "WETH",
      name: "Wrapped ETH",
    },
    baseToken: {
      symbol: "USDT",
      name: "USDT",
    },
    ticker: "WETH/USDT",
    currentPrice: "4,469.177",
    change: "89,38234",
    percentChange: "0.02%",
    changePeriod: "24 hours",
    detailPageUrl: "/spot/2",
    volume: "5956.05",
  },
  {
    id: "3",
    quoteToken: {
      symbol: "BTC",
      name: "Bitcoin",
    },
    baseToken: {
      symbol: "USDT",
      name: "USDT",
    },
    ticker: "BTC/USDT",
    currentPrice: "60,966.04",
    change: "2,439,8416",
    percentChange: "0.04%",
    changePeriod: "24 hours",
    detailPageUrl: "/spot/3",
    volume: "5956.05",
  },
];
