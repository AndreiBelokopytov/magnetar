import React, { useEffect } from "react";
import { PageHeader, StackView } from "~/components";
import { useWalletAdapter } from "~/hooks";
import { WalletType } from "~/domain";
import { observer } from "mobx-react";

type Props = {
  children: React.ReactNode;
};

export const PageLayout = observer(({ children }: Props) => {
  const metaMaskWalletAdapter = useWalletAdapter(WalletType.metaMask);

  const activeWallet = metaMaskWalletAdapter.isActive ? metaMaskWalletAdapter : undefined;

  useEffect(() => {
    activeWallet?.connect();
  }, [activeWallet]);

  return (
    <StackView flex>
      <PageHeader
        accountInfo={activeWallet?.accountInfo}
        isWalletConnected={activeWallet?.isWalletConnected}
        connectMetaMask={metaMaskWalletAdapter?.connect}
        isMetaMaskConnecting={metaMaskWalletAdapter?.isConnecting}
      />
      {children}
    </StackView>
  );
});
