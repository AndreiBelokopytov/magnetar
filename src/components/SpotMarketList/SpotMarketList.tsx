import { observer } from "mobx-react";
import { ActivityIndicator } from "react-native";
import { SpotMarketListItemVM, StackView } from "~/components";
import { SpotMarketListItem } from "./SpotMarketListItem";
import { useHistory } from "react-router-dom";

type Props = {
  items: SpotMarketListItemVM[];
  loading?: boolean;
};

export const SpotMarketList = observer(({ items, loading }: Props) => {
  const history = useHistory();

  const handleItemPress = (item: SpotMarketListItemVM) => history.push(`/${item.id}`);

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
        <SpotMarketListItem model={item} key={item.pair} onPress={handleItemPress} />
      ))}
    </>
  );
});
