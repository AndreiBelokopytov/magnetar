import { observer } from "mobx-react";
import { MarketListItemVM } from "~/components";
import { MarketListItem } from "./MarketListItem";
import React from "react";
import { useHistory } from "react-router";
import { Box, Heading, Spinner } from "grommet";

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
      <Box flex justify={"center"} align={"center"}>
        <Spinner />
      </Box>
    );
  }
  return (
    <Box>
      <Box pad={{ left: "16px", right: "16px", top: "8px" }}>
        <Heading level={3}>{title}</Heading>
      </Box>
      {items.map((item) => (
        <MarketListItem model={item} key={item.pair} onClick={handleItemPress} />
      ))}
    </Box>
  );
});
