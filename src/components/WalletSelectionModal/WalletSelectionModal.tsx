import React from "react";
import { observer } from "mobx-react";
import { Box, Button } from "grommet";
import { Modal } from "~/components";

type Props = {
  connectMetaMask?(): void;
  isMetaMaskConnecting?: boolean;
  isWalletConnected?: boolean;
  open?: boolean;
  onClose?: () => void;
};

export const WalletSelectionModal = observer(
  ({ connectMetaMask, isMetaMaskConnecting, isWalletConnected, open, onClose }: Props) => {
    const handleClose = () => onClose?.();
    const handleConnectMetaMask = () => connectMetaMask?.();

    React.useEffect(() => {
      if (isWalletConnected) {
        onClose?.();
      }
    }, [isWalletConnected, onClose]);

    return (
      <Modal open={open} onClose={handleClose}>
        <Box align={"center"} justify={"center"} width={"480px"} height={"320px"}>
          <Button disabled={isMetaMaskConnecting} onClick={handleConnectMetaMask}>
            Connect MetaMask
          </Button>
        </Box>
      </Modal>
    );
  }
);
