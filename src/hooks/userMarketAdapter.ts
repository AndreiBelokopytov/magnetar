import { MarketType } from "~/domain";
import { useRef } from "react";
import { MarketAdapter, MarketAdapterFactory } from "~/adapters";
import { useFactory } from "~/DIContainer";

export function userMarketAdapter(marketType: MarketType): MarketAdapter {
  const marketAdapter = useRef<MarketAdapter>();
  const marketAdapterFactory = useFactory<MarketAdapter, [MarketType]>(MarketAdapterFactory);

  if (!marketAdapter.current) {
    marketAdapter.current = marketAdapterFactory?.(marketType);
  }

  return marketAdapter.current;
}
