import React from "react";
import { MarketList } from "~/components";
import { useIntervalRefresh, userMarketAdapter } from "~/hooks";
import { observer } from "mobx-react";
import { MarketType } from "~/domain";

const REFRESH_INTERVAL = 3000;

type Props = {
  marketType: MarketType;
};

export const MarketListContainer = observer(({ marketType }: Props) => {
  const marketAdapter = userMarketAdapter(marketType);
  const refreshByInterval = useIntervalRefresh(marketAdapter.refreshAllSummary, REFRESH_INTERVAL);

  React.useEffect(() => {
    marketAdapter.refreshAll();
    const subscription = refreshByInterval.subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [marketAdapter, refreshByInterval]);

  return <MarketList loading={!marketAdapter?.isReady} items={marketAdapter.marketListItems} />;
});
