import { AccountInfoPanelVM } from "~/components";
import { Box, Text } from "grommet";

type Props = {
  model: AccountInfoPanelVM;
};

export const AccountInfoPanel = ({ model }: Props) => {
  return (
    <Box>
      <Box>
        <Text size={"small"}>Ethereum address</Text>
        <Box direction={"row"} align={"center"}>
          <Text>{model.ethereumAddress}</Text>
        </Box>
      </Box>
      <Box margin={{ bottom: "16px" }}>
        <Text size={"small"}>Injective address</Text>
        <Box direction={"row"} align={"center"}>
          <Text>{model.injectiveAddress}</Text>
        </Box>
      </Box>
    </Box>
  );
};
