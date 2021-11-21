import { observer } from "mobx-react";
import { ActivityIndicator } from "react-native";
import { MarketListItemVM, StackView, Typography } from "~/components";
import { MarketListItem } from "./MarketListItem";
import { useNavigation } from "@react-navigation/native";
import React from "react";

type Props = {
  items: MarketListItemVM[];
  title: string;
  loading?: boolean;
};

export const MarketList = observer(({ items, title, loading }: Props) => {
  const navigation = useNavigation();

  const handleItemPress = (item: MarketListItemVM) =>
    // @ts-ignore
    navigation.navigate(item.detailPageUrl, {
      marketId: item.id,
    });

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
