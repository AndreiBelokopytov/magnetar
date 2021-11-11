import { observer } from "mobx-react";
import { SpotMarketListItem, SpotMarketListItemVM } from "./SpotMarketListItem";
import { StackView } from "../StackView";
import { ActivityIndicator } from "react-native";

type Props = {
  items: SpotMarketListItemVM[];
  loading?: boolean;
};

export const SpotMarketList = observer(({ items, loading }: Props) => {
  if (loading) {
    return (
      <StackView flex justifyContent={"center"} alignItems={"center"}>
        <ActivityIndicator size={"large"} />
      </StackView>
    );
  }
  return (
    <>
      {items.map((item) => (
        <SpotMarketListItem model={item} key={item.pair} />
      ))}
    </>
  );
});
