import React, { useState } from "react";
import { WalletSelectionModal, AccountInfoPanel, AccountInfoPanelVM } from "~/components";
import { Box, Button, Heading } from "grommet";

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
      <Box
        direction={"row"}
        width={"100%"}
        height={"60px"}
        align={"center"}
        pad={{ horizontal: "32px" }}
        background={"accent-1"}
      >
        <Heading level={3}>Magnetar</Heading>
        <Box flex />
        {accountInfo ? (
          <AccountInfoPanel model={accountInfo} />
        ) : (
          <Button onClick={openWalletModal}>Connect wallet</Button>
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
