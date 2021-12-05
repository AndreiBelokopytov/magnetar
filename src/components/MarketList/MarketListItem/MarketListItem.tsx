import { observer } from "mobx-react";
import { MarketListItemVM, FallGrowthIndicator } from "~/components";
import { Avatar, Box, Heading, Text, Card } from "grommet";

type Props = {
  model: MarketListItemVM;
  onClick?: (item: MarketListItemVM) => void;
};

export const MarketListItem = observer(({ model, onClick }: Props) => {
  const handleClick = () => onClick?.(model);

  return (
    <Card pad={"16px"} onClick={handleClick}>
      <Box direction={"row"} justify={"between"} align={"start"}>
        <Box margin={{ right: "40px" }}>
          <Heading level={3}>{model.ticker}</Heading>
          <Box flex margin={{ top: "8px" }}>
            <Text size={"xsmall"} color={"light-3"}>
              Last traded price
            </Text>
            <Box direction={"row"}>
              <Text color={"light-1"}>{model.lastPrice}</Text>
              <Box margin={{ left: "8px" }}>
                <Text color={"light-3"}>{model.quoteSymbol}</Text>
              </Box>
            </Box>
            <Box margin={{ top: "4px" }}>
              <FallGrowthIndicator size={"small"}>{model.change}</FallGrowthIndicator>
            </Box>

            <Box margin={{ top: "16px" }}>
              <Text size={"xsmall"} color={"light-3"}>
                24h volume
              </Text>
              <Box direction={"row"} justify={"between"}>
                <Text color={"light-1"}>{model.volume}</Text>
                <Box margin={{ left: "8px" }}>
                  <Text color={"light-3"}>{model.quoteSymbol}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          {model.imageUrl ? (
            <Avatar size={"medium"} src={model.imageUrl} background={"light-3"} />
          ) : (
            <Avatar size={"medium"} background={"light-3"} />
          )}
        </Box>
      </Box>
    </Card>
  );
});
