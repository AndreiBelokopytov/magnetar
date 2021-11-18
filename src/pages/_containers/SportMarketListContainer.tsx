import { useInstanceOf } from "~/DIContainer";
import { SpotMarketAdapter } from "~/adapters";
import React from "react";
import { SpotMarketList } from "~/components";
import { useIntervalRefresh } from "~/hooks";
import { observer } from "mobx-react";

const REFRESH_INTERVAL = 3000;

export const SportMarketListContainer = observer(() => {
  const spotMarketAdapter = useInstanceOf<SpotMarketAdapter>(SpotMarketAdapter);

  React.useEffect(() => {
    spotMarketAdapter.refresh();
  }, [spotMarketAdapter]);

  useIntervalRefresh(() => spotMarketAdapter.refreshSummary(), REFRESH_INTERVAL);

  return <SpotMarketList loading={spotMarketAdapter.isLoading} items={spotMarketAdapter.marketListItems} />;
});
