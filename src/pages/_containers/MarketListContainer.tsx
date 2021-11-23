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
  const spotMarketAdapter = userMarketAdapter(marketType);
  const refreshByInterval = useIntervalRefresh(spotMarketAdapter.refreshAllSummary, REFRESH_INTERVAL);

  React.useEffect(() => {
    spotMarketAdapter.refreshAll();
    const subscription = refreshByInterval.subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [spotMarketAdapter, refreshByInterval]);

  return <MarketList loading={!spotMarketAdapter?.isReady} items={spotMarketAdapter.marketListItems} />;
});
