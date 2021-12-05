import React from "react";
import { AccountInfoPanelVM } from "~/components";
import { Box, Text } from "grommet";
import { EtherIcon, InjectiveIcon, LogoutIcon, MetamaskIcon } from "../base";
import { WalletButton } from "../WalletButton";

type Props = {
  model: AccountInfoPanelVM;
};

const enum AddressType {
  Ether,
  Injective
}

export const AccountInfoPanel = ({ model }: Props) => {
  const [ showedAddress, setShowedAddress ] = React.useState(AddressType.Ether);
  const isEtherAddress = showedAddress === AddressType.Ether;

  return (
    <Box direction={"row"}>
      <Box margin={{right: "8px"}} justify="center">
        <MetamaskIcon width={22} />
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <WalletButton>
          <Text color="light-3" size="small">
            {isEtherAddress ? model.ethereumAddress : model.injectiveAddress}
          </Text>
        </WalletButton>
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <EtherIcon isActive={isEtherAddress} onClick={() => setShowedAddress(AddressType.Ether)} width={24} />
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <InjectiveIcon isActive={!isEtherAddress} onClick={() => setShowedAddress(AddressType.Injective)} width={24} />
      </Box>
      <Box margin={{right: "8px"}} justify="center">
        <LogoutIcon width={24} />
      </Box>
    </Box>
  );
};
