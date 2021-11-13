import { Button, Modal, StackView } from "~/components";
import React from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react";

type Props = {
  connectMetaMask(): void;
  isMetaMaskConnecting?: boolean;
  isWalletConnected?: boolean;
  open?: boolean;
  onClose?: () => void;
};

export const WalletSelectionModal = observer(
  ({ connectMetaMask, isMetaMaskConnecting, isWalletConnected, open, onClose }: Props) => {
    const handleClose = () => onClose?.();

    React.useEffect(() => {
      if (isWalletConnected) {
        onClose?.();
      }
    }, [isWalletConnected, onClose]);

    return (
      <Modal visible={open} onClose={handleClose} contentStyle={styles.walletModalContent}>
        <StackView alignItems={"center"} justifyContent={"center"} bgColor={"white"}>
          <Button loading={isMetaMaskConnecting} onPress={connectMetaMask}>
            Connect MetaMask
          </Button>
        </StackView>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  walletModalContent: {
    width: 480,
    height: 320,
  },
});
