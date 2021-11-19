import { StackView } from "~/components";
import React from "react";
import { observer } from "mobx-react";
import { ScrollView, StyleSheet } from "react-native";
import { PageLayout, SportMarketListContainer as SpotMarketList } from "~/pages/_containers";

export const MarketsPage = observer(() => {
  return (
    <PageLayout>
      <StackView flex>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <StackView flex alignItems={"center"}>
            <StackView flex width={600}>
              <SpotMarketList />
            </StackView>
          </StackView>
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
