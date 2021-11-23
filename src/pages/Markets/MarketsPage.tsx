import { PageLayout } from "~/components";
import React from "react";
import { observer } from "mobx-react";
import { MarketListContainer as SpotMarketList, PageHeaderContainer } from "~/pages/_containers";
import { MarketType } from "~/domain";
import { Box } from "grommet";

export const MarketsPage = observer(() => {
  return (
    <PageLayout header={<PageHeaderContainer />}>
      <Box flex>
        <SpotMarketList title={"Spot markets"} marketType={MarketType.spot} />
      </Box>
    </PageLayout>
  );
});
