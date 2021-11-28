import React from "react";
import { observer } from "mobx-react";
import { Box, Text, Card } from "grommet";
import { Modal, MetamaskIcon } from "~/components";
import { normalizeColor } from "grommet/utils";
import { useTheme } from "styled-components";

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
    const theme = useTheme();

    React.useEffect(() => {
      if (isWalletConnected) {
        onClose?.();
      }
    }, [isWalletConnected, onClose]);

    return (
      <Modal
        open={open}
        onClose={handleClose}
        style={
          {
            backgroundColor: normalizeColor("dark-2", theme),
            borderRadius: "8px"
          }
        }
      >
        <Box direction={"column"} align={"center"} justify={"start"}>
          <Text weight={600} margin={"-24px 0 24px 0"} style={{fontSize: "20px"}}>
            Connect wallet
          </Text>
          <Box align={"center"} justify={"center"} width={"400px"} margin={"0 0 -24px 0"}>
            <Card style={{width: "100%", backgroundColor: normalizeColor("dark-1", theme)}} onClick={!isMetaMaskConnecting ? handleConnectMetaMask : undefined}>
              <Box
                align={"center"}
                justify={"start"}
                direction={"row"}
                pad={"8px 16px"}
                gap={"16px"}
                style={
                  {
                    borderRadius: "16px"
                  }
                }
              >
                <MetamaskIcon width={43} height={40} />
                <Box
                  align={"start"}
                  justify={"stretch"}
                  direction={"column"}
                >
                  <Text size={"large"}>
                    Connect MetaMask
                  </Text>
                  <Text
                    size={"xsmall"}
                    style={
                      {
                        color: normalizeColor("light-2", theme)
                      }
                    }
                  >
                    Connect using browser wallet
                  </Text>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Modal>
    );
  }
);
