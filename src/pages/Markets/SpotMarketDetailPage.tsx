import { MarketDetailHeader, StackView } from "~/components";
import { PageLayout } from "../_containers";
import { useInstanceOf } from "~/DIContainer";
import { SpotMarketAdapter } from "~/adapters";
import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useIntervalRefresh } from "~/hooks";

type Params = {
  id: string;
};

const REFRESH_INTERVAL = 3000;

export const SpotMarketDetailPage = observer(() => {
  const spotMarketAdapter = useInstanceOf<SpotMarketAdapter>(SpotMarketAdapter);

  const { id: marketId } = useParams<Params>();

  React.useEffect(() => {
    spotMarketAdapter.refreshSingle(marketId);
  }, [spotMarketAdapter, marketId]);

  useIntervalRefresh(() => spotMarketAdapter.refreshSingleSummary(marketId), REFRESH_INTERVAL);

  if (!spotMarketAdapter.marketDetail || spotMarketAdapter.marketDetail.id !== marketId) {
    return null;
  }

  return (
    <PageLayout>
      <StackView flex>
        <MarketDetailHeader model={spotMarketAdapter.marketDetail} />
      </StackView>
    </PageLayout>
  );
});
