import { AccountInfo, Button, PageLayout, StackView } from "~/components";
import React from "react";
import { WalletType } from "~/domain";
import { useWalletAdapter } from "~/hooks";
import { observer } from "mobx-react";
export const WalletPage = observer(() => {
  const metaMaskWalletAdapter = useWalletAdapter(WalletType.metaMask);
  const activeWallet = metaMaskWalletAdapter.isActive ? metaMaskWalletAdapter : undefined;

  return (
    <PageLayout>
      <StackView alignItems={"center"} justifyContent={"center"} flex>
        {activeWallet?.accountInfo ? (
          <AccountInfo model={activeWallet.accountInfo} />
        ) : (
          <Button loading={metaMaskWalletAdapter?.isConnecting} onPress={metaMaskWalletAdapter?.connect}>
            Connect MetaMask
          </Button>
        )}
      </StackView>
    </PageLayout>
  );
});
