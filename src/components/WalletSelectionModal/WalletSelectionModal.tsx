import React from "react";
import { observer } from "mobx-react";
import { Box, Text, Heading } from "grommet";
import { Modal, MetamaskIcon, WalletButton } from "~/components";

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
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box direction={"column"} align={"center"} justify={"start"} pad={"24px 16px"}>
          <Heading level={3}>
            Connect wallet
          </Heading>
          <Box align={"stretch"} justify={"center"} width={"400px"} margin={"16px 0 0 0"}>
            <WalletButton
              onClick={!isMetaMaskConnecting ? handleConnectMetaMask : undefined}
            >
              <Box
                align={"center"}
                justify={"start"}
                direction={"row"}
                gap={"16px"}
                round={"16px"}
              >
                <MetamaskIcon width={43} height={40} />
                <Box
                  align={"start"}
                  justify={"stretch"}
                  direction={"column"}
                >
                  <Text size={"medium"} color={"light-1"}>
                    Metamask
                  </Text>
                  <Text size={"xsmall"} color={"light-3"}>
                    Connect using browser wallet
                  </Text>
                </Box>
              </Box>
            </WalletButton>
          </Box>
        </Box>
      </Modal>
    );
  }
);
