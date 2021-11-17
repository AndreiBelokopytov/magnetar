import { SpotMarketList, StackView } from "~/components";
import { useInstanceOf } from "~/DIContainer";
import { SpotMarketAdapter } from "~/adapters";
import React from "react";
import { observer } from "mobx-react";
import { ScrollView, StyleSheet } from "react-native";
import { useIntervalRefresh } from "~/hooks";
import { Disposer } from "~/utils";
import { PageLayout } from "~/pages/_containers";

export const WelcomePage = observer(() => {
  const spotMarketAdapter = useInstanceOf<SpotMarketAdapter>(SpotMarketAdapter);

  React.useEffect(() => {
    spotMarketAdapter?.refresh();
    let dispose: Disposer | undefined = undefined;
    if (spotMarketAdapter) {
      dispose = useIntervalRefresh(() => spotMarketAdapter?.refreshSummary(), 3000);
    }
    return () => dispose?.();
  }, [spotMarketAdapter]);

  return (
    <PageLayout>
      <StackView flex>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <StackView flex alignItems={"center"}>
            <StackView flex width={600}>
              <SpotMarketList loading={spotMarketAdapter?.isLoading} items={spotMarketAdapter?.marketListItems ?? []} />
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
