import { ContainerModule, interfaces } from "inversify";
import { MarketAdapter, MarketAdapterFactory } from "./injective";
import { AccountInfoAdapter, WalletAdapter, WalletAdapterFactory } from "./wallet";
import { MetaMaskAdapterImpl } from "./wallet/MetaMaskAdapter.impl";
import { MarketType, WalletType } from "~/domain";
import { WalletAdapterDelegateImpl } from "./wallet/WalletAdapterDelegate.impl";
import { WalletAdapterDelegate } from "./wallet/WalletAdapterDelegate";
import { SpotMarketAdapterImpl } from "./injective/SpotMarketAdapter.impl";
import { DerivativeMarketAdapterImpl } from "./injective/DerivativeMarketAdapter.impl";
import { AccountInfoAdapterImpl } from "~/adapters/AccountInfoAdapter.impl";

export const adapterModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<MarketAdapter>(MarketAdapter).to(SpotMarketAdapterImpl).whenTargetNamed(MarketType.spot);
  bind<MarketAdapter>(MarketAdapter).to(DerivativeMarketAdapterImpl).whenTargetNamed(MarketType.derivative);
  bind<interfaces.Factory<MarketAdapter>>(MarketAdapterFactory).toFactory<MarketAdapter, [MarketType]>(
    (context: interfaces.Context) => (type: MarketType) => {
      switch (type) {
        case MarketType.spot:
          return context.container.getNamed<MarketAdapter>(MarketAdapter, MarketType.spot);
        case MarketType.derivative:
          return context.container.getNamed<MarketAdapter>(MarketAdapter, MarketType.derivative);
      }
    }
  );
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
  bind<AccountInfoAdapter>(AccountInfoAdapter).to(AccountInfoAdapterImpl);
});
