import React from "react";
import { MarketList } from "~/components";
import { useIntervalRefresh, userMarketAdapter } from "~/hooks";
import { observer } from "mobx-react";
import { useFocusEffect } from "@react-navigation/native";
import { MarketType } from "~/domain";

const REFRESH_INTERVAL = 3000;

type Props = {
  title: string;
  marketType: MarketType;
};

export const MarketListContainer = observer(({ title, marketType }: Props) => {
  const spotMarketAdapter = userMarketAdapter(marketType);
  const refreshByInterval = useIntervalRefresh(spotMarketAdapter.refreshAllSummary, REFRESH_INTERVAL);

  useFocusEffect(
    React.useCallback(() => {
      spotMarketAdapter.refreshAll();
      const subscription = refreshByInterval.subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }, [spotMarketAdapter, refreshByInterval])
  );

  return <MarketList loading={spotMarketAdapter.isLoading} items={spotMarketAdapter.marketListItems} title={title} />;
});
