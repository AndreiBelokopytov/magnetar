import { observer } from "mobx-react";
import { TouchableOpacity } from "react-native";
import { StackView, Logo, Typography, MarketListItemVM, FallGrowthIndicator } from "~/components";

type Props = {
  model: MarketListItemVM;
  onPress?: (item: MarketListItemVM) => void;
};

const IMAGE_SIZE = 48;

export const MarketListItem = observer(({ model, onPress }: Props) => {
  const handlePress = () => onPress?.(model);

  return (
    <TouchableOpacity onPress={handlePress}>
      <StackView direction={"row"} alignItems={"center"} pt={8} pb={8} pl={16} pr={16}>
        <StackView mr={16}>
          <Logo size={IMAGE_SIZE} sourceUri={model.imageUrl} />
        </StackView>
        <StackView flex>
          <StackView direction={"row"} justifyContent={"space-between"}>
            <Typography>{model.pair}</Typography>
            <Typography>{model.lastPrice}</Typography>
          </StackView>
          <StackView direction={"row"} justifyContent={"space-between"}>
            <Typography variant={"subhead"}>{model.ticker}</Typography>
            <FallGrowthIndicator variant={"subhead"}>{model.change}</FallGrowthIndicator>
          </StackView>
        </StackView>
      </StackView>
    </TouchableOpacity>
  );
});
