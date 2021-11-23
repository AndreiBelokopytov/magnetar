import { observer } from "mobx-react";
import { MarketListItemVM, FallGrowthIndicator } from "~/components";
import { Avatar, Box, Text } from "grommet";

type Props = {
  model: MarketListItemVM;
  onClick?: (item: MarketListItemVM) => void;
};

export const MarketListItem = observer(({ model, onClick }: Props) => {
  const handleClick = () => onClick?.(model);

  return (
    <Box onClick={handleClick}>
      <Box direction={"row"} align={"center"} pad={{ horizontal: "16px", vertical: "8px" }}>
        <Box margin={{ right: "16px" }}>
          {model.imageUrl ? (
            <Avatar size={"medium"} src={model.imageUrl} background={"light-3"} />
          ) : (
            <Avatar size={"medium"} background={"light-3"} />
          )}
        </Box>
        <Box flex>
          <Box direction={"row"} justify={"between"}>
            <Text>{model.pair}</Text>
            <Text>{model.lastPrice}</Text>
          </Box>
          <Box direction={"row"} justify={"between"}>
            <Text size={"small"}>{model.ticker}</Text>
            <FallGrowthIndicator size={"small"}>{model.change}</FallGrowthIndicator>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
