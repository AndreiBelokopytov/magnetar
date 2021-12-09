import { LineChart, MarketDetailHeader, OrderForm, PageLayout, PageFooter } from "~/components";
import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useObservable, userMarketAdapter } from "~/hooks";
import { MarketType } from "~/domain";
import { PageHeaderContainer as PageHeader } from "~/pages/_containers";
import { Box, Grid } from "grommet";

const REFRESH_SUMMARY_INTERVAL = 3000;
const REFRESH_HISTORY_INTERVAL = 30000;

type Params = {
  id: string;
};

type Props = {
  marketType: MarketType;
};

export const MarketDetailPage = observer(({ marketType }: Props) => {
  const marketAdapter = userMarketAdapter(marketType);

  const { id: marketId } = useParams<Params>();

  useObservable(marketAdapter.refreshSummary$(marketId, REFRESH_SUMMARY_INTERVAL));
  useObservable(marketAdapter.refreshHistory$(REFRESH_HISTORY_INTERVAL));

  React.useEffect(() => {
    marketAdapter.refreshSingleMarket(marketId);
  }, [marketAdapter, marketId]);

  if (!marketAdapter.marketDetail || marketAdapter.marketDetail.id !== marketId) {
    return null;
  }

  return (
    <PageLayout header={<PageHeader />} footer={<PageFooter />}>
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
