import { ContainerModule, interfaces } from "inversify";
import { MetaMaskOnBoardingProvider } from "~/api/MetaMaskOnBoardingProvider";
import { MetaMaskOnBoardingProviderImpl } from "~/api/MetaMaskOnBoardingProvider.impl";

export const apiModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<MetaMaskOnBoardingProvider>(MetaMaskOnBoardingProvider).toDynamicValue(
    () => new MetaMaskOnBoardingProviderImpl()
  );
});
