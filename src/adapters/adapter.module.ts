import { ContainerModule, interfaces } from "inversify";
import { SpotMarketAdapter } from "./injective/SpotMarketAdapter";
import { SpotMarketAdapterImpl } from "./injective/SpotMarketAdapter.impl";
import { WalletAdapter, WalletAdapterFactory } from "./wallet";
import { MetaMaskAdapterImpl } from "./wallet/MetaMaskAdapter.impl";
import { WalletType } from "~/domain";
import { WalletAdapterDelegateImpl } from "./wallet/WalletAdapterDelegate.impl";
import { WalletAdapterDelegate } from "./wallet/WalletAdapterDelegate";

export const adapterModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketAdapter>(SpotMarketAdapter).to(SpotMarketAdapterImpl);
  bind<WalletAdapterDelegate>(WalletAdapterDelegate).to(WalletAdapterDelegateImpl);
  bind<WalletAdapter>(WalletAdapter).to(MetaMaskAdapterImpl).inSingletonScope().whenTargetNamed(WalletType.metaMask);
  bind<interfaces.Factory<WalletAdapter>>(WalletAdapterFactory).toFactory<WalletAdapter | undefined, [WalletType]>(
    (context: interfaces.Context) => (type: WalletType) => {
      switch (type) {
        case WalletType.metaMask:
          return context.container.getNamed<WalletAdapter>(WalletAdapter, WalletType.metaMask);
        case WalletType.unknown:
          return undefined;
      }
    }
  );
});
