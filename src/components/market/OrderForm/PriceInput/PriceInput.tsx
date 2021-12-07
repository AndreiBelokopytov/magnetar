import { Wallet as WalletIcon } from "react-bootstrap-icons";
import { Avatar, Box, Text } from "grommet";
import { observer } from "mobx-react";
import { Input, TokenVM } from "~/components";

type Props = React.ComponentProps<typeof Input> & {
  label: string;
  model: TokenVM;
};

export const PriceInput = observer(({ label, model, ...rest }: Props) => {
  const labelRight = model.balance && (
    <Box direction={"row"} align={"center"}>
      <WalletIcon />
      <Box margin={{ left: "8px" }}>{model.balance}</Box>
    </Box>
  );

  const addonRight = (
    <Box direction={"row"} align={"center"}>
      {model.imageUrl ? (
        <Avatar size={"small"} src={model.imageUrl} background={"light-3"} />
      ) : (
        <Avatar size={"small"} background={"light-3"} />
      )}
      <Box margin={{ left: "8px" }}>
        <Text color={"light-2"}>{model.symbol}</Text>
      </Box>
    </Box>
  );

  return <Input {...rest} labelLeft={label} labelRight={labelRight} addonAfter={addonRight} />;
});
