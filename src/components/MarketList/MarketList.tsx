import { observer } from "mobx-react";
import { MarketListItemVM } from "~/components";
import { MarketListItem } from "./MarketListItem";
import React from "react";
import { useHistory } from "react-router";
import { Box, Spinner } from "grommet";

type Props = {
  items: MarketListItemVM[];
  loading?: boolean;
};

export const MarketList = observer(({ items, loading }: Props) => {
  const history = useHistory();

  const handleItemPress = (item: MarketListItemVM) => history.push(item.detailPageUrl);

  if (loading) {
    return (
      <Box flex justify={"center"} align={"center"}>
        <Spinner />
      </Box>
    );
  }
  return (
    <Box>
      {items.map((item) => (
        <MarketListItem model={item} key={item.pair} onClick={handleItemPress} />
      ))}
    </Box>
  );
});
