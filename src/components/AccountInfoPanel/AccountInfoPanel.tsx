import { AccountInfoPanelVM } from "~/components";
import { Box, Text } from "grommet";
import { CopyIcon, EtherIcon, EyeIcon, LogoutIcon, MetamaskIcon } from "../base";
import { WalletButton } from "../WalletButton";

type Props = {
  model: AccountInfoPanelVM;
};

export const AccountInfoPanel = ({ model }: Props) => {
  return (
    <Box direction={"row"}>
      <Box margin={{right: "8px"}} justify="center">
        <MetamaskIcon width={22} />
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <WalletButton>
          <Text color="light-3" size="small">
            {model.ethereumAddress || model.injectiveAddress}
          </Text>
        </WalletButton>
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <EtherIcon width={24} />
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <CopyIcon width={24} />
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <EyeIcon width={24} />
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <LogoutIcon width={24} />
      </Box>
    </Box>
  );
};
