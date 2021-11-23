import { PageLayout } from "~/components";
import React from "react";
import { observer } from "mobx-react";
import { MarketListContainer as MarketList, PageHeaderContainer } from "~/pages/_containers";
import { MarketType } from "~/domain";
import { Box, Tabs, Tab } from "grommet";

export const MarketsPage = observer(() => {
  return (
    <PageLayout header={<PageHeaderContainer />}>
      <Box margin={{ top: "40px" }}>
        <Tabs justify={"start"}>
          <Tab title="Spot">
            <Box pad={{ vertical: "24px" }}>
              <MarketList marketType={MarketType.spot} />
            </Box>
          </Tab>
          <Tab title="Derivative">
            <Box pad={{ vertical: "24px" }}>
              <MarketList marketType={MarketType.derivative} />
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </PageLayout>
  );
});
