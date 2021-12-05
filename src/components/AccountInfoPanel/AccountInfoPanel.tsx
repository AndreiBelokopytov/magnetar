import React from "react";
import { AccountInfoPanelVM } from "~/components";
import { Box, Text } from "grommet";
import { EtherIcon, IconButton, InjectiveIcon, LogoutIcon, MetamaskIcon } from "../base";
import { WalletButton } from "../WalletButton";

type Props = {
  model: AccountInfoPanelVM;
};

const enum AddressType {
  ether,
  injective
}

export const AccountInfoPanel = ({ model }: Props) => {
  const [ showedAddress, setShowedAddress ] = React.useState(AddressType.ether);
  let addressText;
  
  switch(showedAddress) {
    case AddressType.ether:
      addressText = model.ethereumAddress;
      break;
    case AddressType.injective:
      addressText = model.injectiveAddress;
      break;
  }

  return (
    <Box direction={"row"}>
      <Box margin={{right: "8px"}} justify="center">
        <MetamaskIcon width={22} />
      </Box>
      <Box justify="center">
        <WalletButton>
          <Text color="light-3" size="small">
            {addressText}
          </Text>
        </WalletButton>
      </Box>
      <Box justify="center">
        <IconButton
          Icon={EtherIcon}
          isSelected={showedAddress === AddressType.ether}
          onClick={() => setShowedAddress(AddressType.ether)}
          size={24}
        />
      </Box>
      <Box justify="center">
        <IconButton
          Icon={InjectiveIcon}
          isSelected={showedAddress === AddressType.injective}
          onClick={() => setShowedAddress(AddressType.injective)}
          size={24}
        />
      </Box>
      <Box justify="center">
        <IconButton
          Icon={LogoutIcon}
          size={24}
        />
      </Box>
    </Box>
  );
};
