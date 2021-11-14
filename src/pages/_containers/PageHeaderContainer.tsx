import { PageHeader } from "~/components";
import { observer } from "mobx-react";
import { useWalletAdapter } from "~/hooks";
import { useEffect } from "react";
import { WalletType } from "~/domain";

export const PageHeaderContainer = observer(() => {
  const metaMaskWalletAdapter = useWalletAdapter(WalletType.metaMask);

  const activeWallet = metaMaskWalletAdapter?.isActive ? metaMaskWalletAdapter : undefined;

  useEffect(() => {
    activeWallet?.connect();
  }, [activeWallet]);

  return (
    <PageHeader
      accountInfo={activeWallet?.accountInfo}
      isWalletConnected={activeWallet?.isWalletConnected}
      connectMetaMask={metaMaskWalletAdapter?.connect}
      isMetaMaskConnecting={metaMaskWalletAdapter?.isConnecting}
    />
  );
});
