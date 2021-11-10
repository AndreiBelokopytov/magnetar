import { observer } from "mobx-react";
import { TouchableOpacity } from "react-native";
import { SpotMarketListItemVM } from "./SpotMarketListItemVM";
import { StackView } from "../../StackView";
import { Logo } from "../../Logo";
import { Typography } from "../../Typography";

type Props = {
  model: SpotMarketListItemVM;
};

const IMAGE_SIZE = 64;

export const SpotMarketListItem = observer(({ model }: Props) => {
  return (
    <TouchableOpacity>
      <StackView direction={"row"} alignItems={"center"} pt={8} pb={8}>
        <StackView mr={24}>
          <Logo size={IMAGE_SIZE} sourceUri={model.imageUrl} />
        </StackView>
        <StackView flex>
          <StackView direction={"row"} justifyContent={"space-between"}>
            <Typography>{model.pair}</Typography>
            <Typography>{model.lastPrice}</Typography>
          </StackView>
          <StackView direction={"row"} justifyContent={"space-between"} pt={8}>
            <Typography variant={"subhead"}>{model.ticker}</Typography>
            <Typography variant={"subhead"}>{model.change}</Typography>
          </StackView>
        </StackView>
      </StackView>
    </TouchableOpacity>
  );
});
