import { SpotMarketList, StackView } from "../../components";
import { useDependency } from "../../DIContainer";
import { SpotMarketAdapter } from "./adapters";
import React from "react";
import { observer } from "mobx-react";
import { StyleSheet } from "react-native";

export const WelcomePage = observer(() => {
  const adapter = useDependency<SpotMarketAdapter>(SpotMarketAdapter);

  React.useEffect(() => {
    adapter?.refresh();
  }, [adapter]);

  return (
    <StackView alignItems={"center"} height={"100%"}>
      <StackView flex width={600} style={styles.content}>
        <SpotMarketList items={adapter?.marketListItems ?? []} />
      </StackView>
    </StackView>
  );
});

const styles = StyleSheet.create({
  content: {
    overflow: "visible",
  },
});
