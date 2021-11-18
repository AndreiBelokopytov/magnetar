import { useInstanceOf } from "~/DIContainer";
import { SpotMarketAdapter } from "~/adapters";
import React from "react";
import { Disposer } from "~/utils";
import { SpotMarketList, SpotMarketListItemVM } from "~/components";
import { useIntervalRefresh } from "~/hooks";
import { observer } from "mobx-react";

const DEFAULT_MARKET_LIST_ITEMS: SpotMarketListItemVM[] = [];
const REFRESH_INTERVAL = 3000;

export const SportMarketListContainer = observer(() => {
  const spotMarketAdapter = useInstanceOf<SpotMarketAdapter>(SpotMarketAdapter);

  React.useEffect(() => {
    spotMarketAdapter?.refresh();
    let dispose: Disposer | undefined = undefined;
    if (spotMarketAdapter) {
      dispose = useIntervalRefresh(() => spotMarketAdapter?.refreshSummary(), REFRESH_INTERVAL);
    }
    return () => dispose?.();
  }, [spotMarketAdapter]);

  return (
    <SpotMarketList
      loading={spotMarketAdapter?.isLoading}
      items={spotMarketAdapter?.marketListItems ?? DEFAULT_MARKET_LIST_ITEMS}
    />
  );
});
