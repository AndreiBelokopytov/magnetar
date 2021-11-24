import { FallGrowthIndicator, MarketDetailVM } from "~/components";
import { Box, Heading, Text } from "grommet";

type Props = {
  model: MarketDetailVM;
};

export const MarketDetailHeader = ({ model }: Props) => {
  return (
    <Box>
      <Heading level={2}>{`${model.quoteToken} / ${model.baseToken}`}</Heading>
      <Box margin={{ top: "8px" }}>
        <Heading level={1}>{model.currentPrice}</Heading>
      </Box>
      <Box direction={"row"} margin={{ top: "8px" }}>
        <FallGrowthIndicator>{`${model.change} (${model.percentChange})`}</FallGrowthIndicator>
        <Box margin={{ left: "8px" }}>
          <Text color={"light-3"}>{model.changePeriod}</Text>
        </Box>
      </Box>
    </Box>
  );
};
