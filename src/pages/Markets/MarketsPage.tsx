import { PageLayout } from "~/components";
import React from "react";
import { observer } from "mobx-react";
import { MarketListContainer as SpotMarketList, PageHeaderContainer } from "~/pages/_containers";
import { MarketType } from "~/domain";
import { Box, Tabs, Tab } from "grommet";

export const MarketsPage = observer(() => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <PageLayout header={<PageHeaderContainer />}>
      <Box margin={{ top: "40px" }}>
        <Tabs justify={"start"} activeIndex={activeIndex} onActive={setActiveIndex}>
          <Tab title="Spot">
            <SpotMarketList marketType={MarketType.spot} />
          </Tab>
          <Tab title="Derivative">
            <Box margin="small" pad="large" align="center">
              <SpotMarketList marketType={MarketType.derivative} />
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </PageLayout>
  );
});
