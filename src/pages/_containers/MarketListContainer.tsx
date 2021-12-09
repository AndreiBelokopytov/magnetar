import React from "react";
import { MarketList } from "~/components";
import { useObservable, userMarketAdapter } from "~/hooks";
import { observer } from "mobx-react";
import { MarketType } from "~/domain";

const REFRESH_INTERVAL = 3000;

type Props = {
  marketType: MarketType;
};

export const MarketListContainer = observer(({ marketType }: Props) => {
  const marketAdapter = userMarketAdapter(marketType);

  useObservable(marketAdapter.refreshAllSummary$(REFRESH_INTERVAL));

  React.useEffect(() => {
    marketAdapter.refreshAllMarkets();
  }, [marketAdapter]);

  return <MarketList loading={!marketAdapter?.isReady} items={marketAdapter.marketListItems} />;
});
