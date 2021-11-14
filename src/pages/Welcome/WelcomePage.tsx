import { SpotMarketList, StackView } from "~/components";
import { useInstanceOf } from "~/DIContainer";
import { SpotMarketAdapter } from "~/adapters";
import { PageHeaderContainer as PageHeader } from "../_containers";
import React from "react";
import { observer } from "mobx-react";
import { ScrollView, StyleSheet } from "react-native";

export const WelcomePage = observer(() => {
  const spotMarketAdapter = useInstanceOf<SpotMarketAdapter>(SpotMarketAdapter);

  React.useEffect(() => {
    spotMarketAdapter?.refresh();
  }, [spotMarketAdapter]);

  React.useEffect(() => {});

  return (
    <StackView flex>
      <PageHeader />
      <StackView flex>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <StackView flex alignItems={"center"}>
            <StackView flex width={600}>
              <SpotMarketList loading={spotMarketAdapter?.isLoading} items={spotMarketAdapter?.marketListItems ?? []} />
            </StackView>
          </StackView>
        </ScrollView>
      </StackView>
    </StackView>
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
  },
});
