import { PageLayout, StackView } from "~/components";
import React from "react";
import { observer } from "mobx-react";
import { ScrollView, StyleSheet } from "react-native";
import { MarketListContainer as SpotMarketList } from "~/pages/_containers";
import { MarketType } from "~/domain";

export const MarketsPage = observer(() => {
  return (
    <PageLayout noPadding>
      <StackView flex>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <SpotMarketList title={"Spot markets"} marketType={MarketType.spot} />
        </ScrollView>
      </StackView>
    </PageLayout>
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
  },
});
