import { StackView, Typography, AccountInfoPanelVM } from "~/components";
import { StyleSheet } from "react-native";

type Props = {
  model: AccountInfoPanelVM;
};

export const AccountInfoPanel = ({ model }: Props) => {
  return (
    <StackView>
      <StackView>
        <Typography variant={"footnote"}>Ethereum address</Typography>
        <StackView direction={"row"} alignItems={"center"}>
          <Typography style={styles.address} overflowHidden>
            {model.ethereumAddress}
          </Typography>
        </StackView>
      </StackView>
      <StackView mt={16}>
        <Typography variant={"footnote"}>Injective address</Typography>
        <StackView direction={"row"} alignItems={"center"}>
          <Typography style={styles.address} overflowHidden>
            {model.injectiveAddress}
          </Typography>
        </StackView>
      </StackView>
    </StackView>
  );
};

const styles = StyleSheet.create({
  address: {
    letterSpacing: 1.4,
  },
});
