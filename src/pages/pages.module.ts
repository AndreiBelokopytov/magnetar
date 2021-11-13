import { ContainerModule, interfaces } from "inversify";
import {
  MetaMaskAdapter,
  MetaMaskAdapterImpl,
  SpotMarketAdapter,
  SpotMarketAdapterImpl,
  MetaMaskOnBoardingProvider,
  MetaMaskOnBoardingProviderImpl,
} from "./_adapters";

export const pagesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketAdapter>(SpotMarketAdapter).to(SpotMarketAdapterImpl);
  bind<MetaMaskOnBoardingProvider>(MetaMaskOnBoardingProvider).toDynamicValue(
    () => new MetaMaskOnBoardingProviderImpl()
  );
  bind<MetaMaskAdapter>(MetaMaskAdapter).to(MetaMaskAdapterImpl);
});
