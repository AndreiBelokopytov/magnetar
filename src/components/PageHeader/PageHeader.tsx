import React, { useState } from "react";
import { Spacer, StackView, Typography, Button, WalletSelectionModal } from "~/components";
import { AccountInfo, AccountInfoVM } from "~/components/AccountInfo";

type Props = {
  accountInfo?: AccountInfoVM;
  connectMetaMask(): void;
  isMetaMaskConnecting?: boolean;
  isWalletConnected?: boolean;
};

export const PageHeader = ({ accountInfo, connectMetaMask, isWalletConnected, isMetaMaskConnecting }: Props) => {
  const [isWalletSelectionOpen, setIsWalletSelectionOpen] = useState(false);

  const openWalletModal = () => setIsWalletSelectionOpen(true);
  const closeWalletModal = () => setIsWalletSelectionOpen(false);

  return (
    <>
      <StackView
        direction={"row"}
        width={"100%"}
        height={60}
        alignItems={"center"}
        pl={32}
        pr={32}
        bgColor={"ghostwhite"}
      >
        <Typography variant={"h3"}>Magnetar</Typography>
        <Spacer />
        {accountInfo ? <AccountInfo model={accountInfo} /> : <Button onPress={openWalletModal}>Connect wallet</Button>}
      </StackView>
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
