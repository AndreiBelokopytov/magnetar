import { PageLayout, StackView } from "~/components";
import { PageHeaderContainer } from "~/pages/_containers";
import React from "react";

export const DerivativeMarketDetailPage = () => {
  return (
    <PageLayout header={<PageHeaderContainer />}>
      <StackView flex />
    </PageLayout>
  );
};
