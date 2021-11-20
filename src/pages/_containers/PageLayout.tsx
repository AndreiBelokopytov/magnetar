import React, { useEffect } from "react";
import { StackView } from "~/components";
import { useWalletAdapter } from "~/hooks";
import { WalletType } from "~/domain";
import { observer } from "mobx-react";
import { colors } from "~/theme";

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
    <StackView direction={"row"} flex justifyContent={"center"} bgColor={colors.accentBackground}>
      <StackView flex width={492} pl={16} pr={16} pt={16} maxWidth={460} bgColor={colors.background}>
        {children}
      </StackView>
    </StackView>
  );
});
