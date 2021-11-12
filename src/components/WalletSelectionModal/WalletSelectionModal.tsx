import { Button, Modal, StackView } from "~/components";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export const WalletSelectionModal = ({ open, onClose }: Props) => {
  const handleClose = () => onClose?.();

  return (
    <Modal visible={open} onClose={handleClose} contentStyle={styles.walletModalContent}>
      <StackView alignItems={"center"} justifyContent={"center"} bgColor={"white"}>
        <Button>Connect MetaMask</Button>
      </StackView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  walletModalContent: {
    width: 480,
    height: 320,
  },
});
