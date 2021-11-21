import { useInstanceOf } from "~/DIContainer";
import { SpotMarketAdapter } from "~/adapters";
import React from "react";
import { SpotMarketList } from "~/components";
import { useIntervalRefresh } from "~/hooks";
import { observer } from "mobx-react";
import { useFocusEffect } from "@react-navigation/native";

const REFRESH_INTERVAL = 3000;

export const SportMarketListContainer = observer(() => {
  const spotMarketAdapter = useInstanceOf<SpotMarketAdapter>(SpotMarketAdapter);
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

  return <SpotMarketList loading={spotMarketAdapter.isLoading} items={spotMarketAdapter.marketListItems} />;
});
