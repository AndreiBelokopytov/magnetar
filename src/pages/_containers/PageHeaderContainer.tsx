import { PageHeader } from "~/components";
import { useDependency } from "~/DIContainer";
import { MetaMaskAdapter } from "~/adapters";
import { useEffect } from "react";
import { observer } from "mobx-react";

export const PageHeaderContainer = observer(() => {
  const metaMaskAdapter = useDependency<MetaMaskAdapter>(MetaMaskAdapter);

  useEffect(() => {
    metaMaskAdapter?.init();
    return () => metaMaskAdapter?.dispose();
  }, [metaMaskAdapter]);

  if (!metaMaskAdapter) {
    return null;
  }

  return (
    <PageHeader
      accountInfo={metaMaskAdapter.accountInfo}
      connectMetaMask={metaMaskAdapter.connect}
      isMetaMaskConnecting={metaMaskAdapter.isConnecting}
      isWalletConnected={metaMaskAdapter.isWalletConnected}
    />
  );
});
