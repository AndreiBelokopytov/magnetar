import { ContainerModule, interfaces } from "inversify";
import { MetaMaskAdapter } from "./MetaMaskAdapter";
import { MetaMaskAdapterImpl } from "./MetaMaskAdapter.impl";
import { MetaMaskOnBoardingProvider } from "./MetaMaskOnBoardingProvider";
import { MetaMaskOnBoardingProviderImpl } from "./MetaMaskOnBoardingProvider.impl";
import { SpotMarketAdapter } from "./SpotMarketAdapter";
import { SpotMarketAdapterImpl } from "./SpotMarketAdapter.impl";

export const adapterModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketAdapter>(SpotMarketAdapter).to(SpotMarketAdapterImpl);
  bind<MetaMaskOnBoardingProvider>(MetaMaskOnBoardingProvider).toDynamicValue(
    () => new MetaMaskOnBoardingProviderImpl()
  );
  bind<MetaMaskAdapter>(MetaMaskAdapter).to(MetaMaskAdapterImpl);
});
