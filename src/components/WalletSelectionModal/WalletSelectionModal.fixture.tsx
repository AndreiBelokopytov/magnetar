import { WalletSelectionModal } from "~/components";
import { useState } from "react";

export default () => {
  const [state, setState] = useState({
    isModalOpen: true,
    isMetaMaskConnecting: false,
    isWalletConnected: false,
  });

  const connectMetaMask = () => {
    setState((prevState) => ({
      ...prevState,
      isMetaMaskConnecting: true,
    }));
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isMetaMaskConnecting: false,
        isWalletConnected: true,
      }));
    }, 2000);
    return Promise.resolve();
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
    }));
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isWalletConnected: false,
        isModalOpen: true,
      }));
    }, 3000);
  };

  return (
    <WalletSelectionModal
      open={state.isModalOpen}
      connectMetaMask={connectMetaMask}
      isWalletConnected={state.isWalletConnected}
      isMetaMaskConnecting={state.isMetaMaskConnecting}
      onClose={handleClose}
    />
  );
};
