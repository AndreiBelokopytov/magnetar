import { ContainerModule, interfaces } from "inversify";
import { MetaMaskOnBoardingProvider } from "./wallet/MetaMaskOnBoardingProvider";
import { MetaMaskOnBoardingProviderImpl } from "./wallet/MetaMaskOnBoardingProvider.impl";
import { SpotMarketAdapter } from "./injective/SpotMarketAdapter";
import { SpotMarketAdapterImpl } from "./injective/SpotMarketAdapter.impl";
import { WalletAdapter, WalletAdapterFactory, WalletType } from "./wallet";
import { MetaMaskAdapterImpl } from "./wallet/MetaMaskAdapter.impl";

export const adapterModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketAdapter>(SpotMarketAdapter).to(SpotMarketAdapterImpl);
  bind<WalletAdapter>(WalletAdapter).to(MetaMaskAdapterImpl).whenTargetNamed(WalletType.metaMask);
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
  bind<MetaMaskOnBoardingProvider>(MetaMaskOnBoardingProvider).toDynamicValue(
    () => new MetaMaskOnBoardingProviderImpl()
  );
});
