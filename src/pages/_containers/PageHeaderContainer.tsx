import { PageHeader } from "~/components";
import { observer } from "mobx-react";
import { useWalletAdapter } from "~/hooks";
import { useEffect } from "react";
import { WalletType } from "~/adapters";

export const PageHeaderContainer = observer(() => {
  const currentWalletAdapter = useWalletAdapter();
  const metaMaskWalletAdapter = useWalletAdapter(WalletType.metaMask);

  useEffect(() => {
    currentWalletAdapter?.connect();
  }, [currentWalletAdapter]);

  return (
    <PageHeader
      accountInfo={currentWalletAdapter?.accountInfo}
      connectMetaMask={metaMaskWalletAdapter?.connect}
      isMetaMaskConnecting={metaMaskWalletAdapter?.isConnecting}
      isWalletConnected={metaMaskWalletAdapter?.isWalletConnected}
    />
  );
});
