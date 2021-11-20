import { FallGrowthIndicator, MarketDetailHeaderVM, StackView, Typography } from "~/components";

type Props = {
  model: MarketDetailHeaderVM;
};

export const MarketDetailHeader = ({ model }: Props) => {
  return (
    <StackView>
      <Typography variant={"h3"}>{`${model.quoteToken}/${model.baseToken}`}</Typography>
      <Typography variant={"h1"}>{model.currentPrice}</Typography>
      <StackView direction={"row"}>
        <FallGrowthIndicator>{`${model.change} (${model.percentChange})`}</FallGrowthIndicator>
        <StackView ml={12}>
          <Typography>{model.changePeriod}</Typography>
        </StackView>
      </StackView>
    </StackView>
  );
};
