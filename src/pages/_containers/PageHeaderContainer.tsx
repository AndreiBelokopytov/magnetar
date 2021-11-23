import { PageHeader } from "~/components";
import { useWalletAdapter } from "~/hooks";
import { WalletType } from "~/domain";
import { useInstanceOf } from "~/DIContainer";
import { AccountInfoAdapter } from "~/adapters";
import React from "react";

export const PageHeaderContainer = () => {
  const accountInfoAdapter = useInstanceOf<AccountInfoAdapter>(AccountInfoAdapter);
  const metaMaskWalletAdapter = useWalletAdapter(WalletType.metaMask);

  const activeWallet = metaMaskWalletAdapter?.isActive ? metaMaskWalletAdapter : undefined;

  React.useEffect(() => {
    activeWallet?.init();
    return () => activeWallet?.dispose();
  }, [activeWallet]);

  return (
    <PageHeader
      accountInfo={accountInfoAdapter.accountInfo}
      isWalletConnected={activeWallet?.isWalletConnected}
      isMetaMaskConnecting={metaMaskWalletAdapter?.isWalletConnected}
      connectMetaMask={metaMaskWalletAdapter?.connect}
    />
  );
};
