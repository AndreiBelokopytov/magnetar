import { AccountInfoPanel, Button, PageLayout, StackView } from "~/components";
import React from "react";
import { observer } from "mobx-react";
import { useInstanceOf } from "~/DIContainer";
import { AccountInfoAdapter } from "~/adapters";
import { useWalletAdapter } from "~/hooks";
import { WalletType } from "~/domain";

export const WalletPage = observer(() => {
  const accountInfoAdapter = useInstanceOf<AccountInfoAdapter>(AccountInfoAdapter);
  const metaMaskWalletAdapter = useWalletAdapter(WalletType.metaMask);

  return (
    <PageLayout>
      <StackView alignItems={"center"} justifyContent={"center"} flex>
        {accountInfoAdapter?.accountInfo ? (
          <AccountInfoPanel model={accountInfoAdapter.accountInfo} />
        ) : (
          <Button loading={metaMaskWalletAdapter?.isConnecting} onPress={metaMaskWalletAdapter?.connect}>
            Connect MetaMask
          </Button>
        )}
      </StackView>
    </PageLayout>
  );
});
