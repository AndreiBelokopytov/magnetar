import { observer } from "mobx-react";
import { ActivityIndicator } from "react-native";
import { MarketListItemVM, StackView, Typography } from "~/components";
import { MarketListItem } from "./MarketListItem";
import React from "react";
import { useHistory } from "react-router";

type Props = {
  items: MarketListItemVM[];
  title: string;
  loading?: boolean;
};

export const MarketList = observer(({ items, title, loading }: Props) => {
  const history = useHistory();

  const handleItemPress = (item: MarketListItemVM) => history.push(item.detailPageUrl);

  if (loading) {
    return (
      <StackView flex justifyContent={"center"} alignItems={"center"}>
        <ActivityIndicator size={"large"} />
      </StackView>
    );
  }
  return (
    <StackView>
      <StackView pl={16} pr={16} mt={8}>
        <Typography variant={"h3"}>{title}</Typography>
      </StackView>
      {items.map((item) => (
        <MarketListItem model={item} key={item.pair} onPress={handleItemPress} />
      ))}
    </StackView>
  );
});
