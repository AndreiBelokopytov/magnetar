import { MarketDetailHeader, PageLayout, StackView } from "~/components";
import { useInstanceOf } from "~/DIContainer";
import { SpotMarketAdapter } from "~/adapters";
import React from "react";
import { observer } from "mobx-react";
import { useIntervalRefresh } from "~/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MarketsStackParams } from "~/Routing.types";
import { MarketType } from "~/domain";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<MarketsStackParams, typeof MarketType.spot>;

const REFRESH_INTERVAL = 3000;

export const SpotMarketDetailPage = observer(({ route }: Props) => {
  const spotMarketAdapter = useInstanceOf<SpotMarketAdapter>(SpotMarketAdapter);
  const marketId = route.params.marketId;

  const refreshByInterval = useIntervalRefresh(
    () => spotMarketAdapter.refreshSingleSummary(marketId),
    REFRESH_INTERVAL
  );

  useFocusEffect(
    React.useCallback(() => {
      spotMarketAdapter.refreshSingle(marketId);
      const subscription = refreshByInterval.subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }, [spotMarketAdapter, refreshByInterval])
  );

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
