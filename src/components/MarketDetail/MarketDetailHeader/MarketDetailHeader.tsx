import { FallGrowthIndicator, MarketDetailVM } from "~/components";
import { Box, Heading, Text } from "grommet";

type Props = {
  model: MarketDetailVM;
};

export const MarketDetailHeader = ({ model }: Props) => {
  return (
    <Box>
      <Heading level={3}>{`${model.quoteToken}/${model.baseToken}`}</Heading>
      <Heading level={1}>{model.currentPrice}</Heading>
      <Box direction={"row"}>
        <FallGrowthIndicator>{`${model.change} (${model.percentChange})`}</FallGrowthIndicator>
        <Box margin={{ left: "12px" }}>
          <Text>{model.changePeriod}</Text>
        </Box>
      </Box>
    </Box>
  );
};
