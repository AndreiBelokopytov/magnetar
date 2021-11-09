import { observer } from "mobx-react";
import { SpotMarketListItem, SpotMarketListItemVM } from "./SpotMarketListItem";
import { FlatList, ListRenderItemInfo } from "react-native";

type Props = {
  items: SpotMarketListItemVM[];
};

export const SpotMarketList = observer(({ items }: Props) => {
  const renderItem = (item: ListRenderItemInfo<SpotMarketListItemVM>) => <SpotMarketListItem model={item.item} />;
  const keyExtractor = (model: SpotMarketListItemVM) => model.pair;

  return <FlatList renderItem={renderItem} data={items} keyExtractor={keyExtractor} />;
});
