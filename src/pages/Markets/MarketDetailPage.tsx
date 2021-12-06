import { LineChart, MarketDetailHeader, OrderForm, PageLayout } from "~/components";
import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useIntervalRefresh, userMarketAdapter } from "~/hooks";
import { MarketType } from "~/domain";
import { PageHeaderContainer as PageHeader } from "~/pages/_containers";
import { Box, Grid } from "grommet";
import { toStream } from "~/utils/toStream";

const REFRESH_INTERVAL = 3000;
const HISTORY_REFRESH_INTERVAL = 30000;

type Params = {
  id: string;
};

type Props = {
  marketType: MarketType;
};

export const MarketDetailPage = observer(({ marketType }: Props) => {
  const marketAdapter = userMarketAdapter(marketType);

  const refreshMarketSummary = useIntervalRefresh(() => marketAdapter.refreshSingleSummary(marketId), REFRESH_INTERVAL);
  const refreshMarketHistory = useIntervalRefresh(
    () => marketAdapter?.refreshHistory(),
    HISTORY_REFRESH_INTERVAL,
    toStream(() => marketAdapter?.isReady)
  );

  const { id: marketId } = useParams<Params>();

  React.useEffect(() => {
    marketAdapter.refreshSingle(marketId);
    const subscriptions = [refreshMarketSummary.subscribe(), refreshMarketHistory.subscribe()];
    return () => subscriptions.forEach((s) => s.unsubscribe());
  }, [marketAdapter, marketId]);

  if (!marketAdapter.marketDetail || marketAdapter.marketDetail.id !== marketId) {
    return null;
  }

  return (
    <PageLayout header={<PageHeader />}>
      <Grid columns={["flex", "1/3"]} areas={[["instrumentInfo", "sidebar"]]} gap="xlarge" margin={{ top: "40px" }}>
        <Box gridArea={"instrumentInfo"}>
          <MarketDetailHeader model={marketAdapter.marketDetail} />
          <Box margin={{ top: "24px" }}>
            {marketAdapter && (
              <LineChart
                width={"100%"}
                height={"360px"}
                paddingTop={48}
                paddingBottom={48}
                points={marketAdapter.lineChartData}
              />
            )}
          </Box>
        </Box>
        <Box gridArea={"sidebar"}>
          <OrderForm market={marketAdapter.marketDetail} />
        </Box>
      </Grid>
    </PageLayout>
  );
});
