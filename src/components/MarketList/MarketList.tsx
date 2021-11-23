import { observer } from "mobx-react";
import { MarketListItemVM } from "~/components";
import { MarketListItem } from "./MarketListItem";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Box, Grid, ResponsiveContext, Spinner } from "grommet";

type Props = {
  items: MarketListItemVM[];
  loading?: boolean;
};

export const MarketList = observer(({ items, loading }: Props) => {
  const history = useHistory();
  const size = useContext(ResponsiveContext);

  const handleItemPress = (item: MarketListItemVM) => history.push(item.detailPageUrl);

  if (loading) {
    return (
      <Box flex justify={"center"} align={"center"}>
        <Spinner />
      </Box>
    );
  }
  return (
    <Grid columns={size !== "small" ? "280px" : "100%"} gap="medium">
      {items.map((item) => (
        <MarketListItem model={item} key={item.id} onClick={handleItemPress} />
      ))}
    </Grid>
  );
});
