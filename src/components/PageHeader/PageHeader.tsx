import React, { useState } from "react";
import { WalletSelectionModal, AccountInfoPanel, AccountInfoPanelVM, MagnetarIcon } from "~/components";
import { Box, Text, Button } from "grommet";

type Props = {
  accountInfo?: AccountInfoPanelVM;
  connectMetaMask?(): void;
  isMetaMaskConnecting?: boolean;
  isWalletConnected?: boolean;
};

export const PageHeader = ({ accountInfo, connectMetaMask, isWalletConnected, isMetaMaskConnecting }: Props) => {
  const [isWalletSelectionOpen, setIsWalletSelectionOpen] = useState(false);

  const openWalletModal = () => setIsWalletSelectionOpen(true);
  const closeWalletModal = () => setIsWalletSelectionOpen(false);

  return (
    <>
      <Box direction={"row"} width={"100%"} height={"60px"} align={"center"}>
        <Box direction={"row"} align={"center"}>
          <MagnetarIcon width={40} height={40} fill={"#6FEBB0"} stroke={"#6FEBB0"} />
          <Box margin={{ left: "10px" }}>
            <Text weight={600} style={{ fontSize: "16px", lineHeight: "40px" }}>
              magnetar
            </Text>
          </Box>
        </Box>

        <Box flex />
        {accountInfo ? (
          <AccountInfoPanel model={accountInfo} />
        ) : (
          <Button
            primary
            onClick={openWalletModal}
            size={"medium"}
            label={"Connect wallet"}
          />
        )}
      </Box>
      <WalletSelectionModal
        isMetaMaskConnecting={isMetaMaskConnecting}
        isWalletConnected={isWalletConnected}
        connectMetaMask={connectMetaMask}
        open={isWalletSelectionOpen}
        onClose={closeWalletModal}
      />
    </>
  );
};
