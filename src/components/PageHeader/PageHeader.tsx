import React, { useState } from "react";
import { Spacer, StackView, Typography, Button, WalletSelectionModal } from "~/components";

export const PageHeader = () => {
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
        <Button onPress={openWalletModal}>Connect wallet</Button>
      </StackView>
      <WalletSelectionModal open={isWalletSelectionOpen} onClose={closeWalletModal} />
    </>
  );
};
