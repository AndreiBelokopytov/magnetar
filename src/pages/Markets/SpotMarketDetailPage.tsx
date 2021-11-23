import { MarketDetailHeader, PageLayout, StackView } from "~/components";
import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useIntervalRefresh, userMarketAdapter } from "~/hooks";
import { MarketType } from "~/domain";
import { PageHeaderContainer } from "~/pages/_containers";

type Params = {
  id: string;
};

const REFRESH_INTERVAL = 3000;

export const SpotMarketDetailPage = observer(() => {
  const spotMarketAdapter = userMarketAdapter(MarketType.spot);
  const refreshByInterval = useIntervalRefresh(
    () => spotMarketAdapter.refreshSingleSummary(marketId),
    REFRESH_INTERVAL
  );

  const { id: marketId } = useParams<Params>();

  React.useEffect(() => {
    spotMarketAdapter.refreshSingle(marketId);
    const subscription = refreshByInterval.subscribe();
    return () => subscription.unsubscribe();
  }, [spotMarketAdapter, marketId]);

  if (!spotMarketAdapter.marketDetail || spotMarketAdapter.marketDetail.id !== marketId) {
    return null;
  }

  return (
    <PageLayout header={<PageHeaderContainer />}>
      <StackView flex>
        <MarketDetailHeader model={spotMarketAdapter.marketDetail} />
      </StackView>
    </PageLayout>
  );
});
