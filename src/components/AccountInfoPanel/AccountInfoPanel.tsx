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
  let addressIcon;
  let addressCallback;
  
  switch(showedAddress) {
    case AddressType.ether:
      addressIcon = EtherIcon;
      addressCallback = () => setShowedAddress(AddressType.injective);
      addressText = model.ethereumAddress;
      break;
    case AddressType.injective:
      addressIcon = InjectiveIcon;
      addressCallback = () => setShowedAddress(AddressType.ether);
      addressText = model.injectiveAddress;
      break;
  }

  return (
    <Box direction={"row"}>
      <Box justify="center">
        <WalletButton>
          <Text color="light-3" size="small">
            {addressText}
          </Text>
        </WalletButton>
      </Box>
      <Box justify="center">
        <IconButton
          Icon={addressIcon}
          onClick={addressCallback}
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
