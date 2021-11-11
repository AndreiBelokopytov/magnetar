import { SpotMarketList, StackView, PageHeader } from "~/components";
import { useDependency } from "~/DIContainer";
import { SpotMarketAdapter } from "./adapters";
import React from "react";
import { observer } from "mobx-react";
import { ScrollView, StyleSheet } from "react-native";

export const WelcomePage = observer(() => {
  const adapter = useDependency<SpotMarketAdapter>(SpotMarketAdapter);

  React.useEffect(() => {
    adapter?.refresh();
  }, [adapter]);

  return (
    <StackView flex>
      <PageHeader />
      <StackView flex>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <StackView flex alignItems={"center"}>
            <StackView flex width={600}>
              <SpotMarketList loading={adapter?.isLoading} items={adapter?.marketListItems ?? []} />
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
