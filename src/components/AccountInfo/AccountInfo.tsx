import { StackView, Typography } from "~/components";
import { AccountInfoVM } from "./AccountInfo.vm";
import { StyleSheet } from "react-native";

type Props = {
  model: AccountInfoVM;
};

export const AccountInfo = ({ model }: Props) => {
  return (
    <StackView direction={"row"}>
      <Typography style={styles.text} overflowHidden>
        {model.address}
      </Typography>
    </StackView>
  );
};

const styles = StyleSheet.create({
  text: {
    maxWidth: 160,
  },
});
