import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStore } from "./SpotMarketStore";
import { SpotMarketStoreImpl } from "./SpotMarketStore.impl";
import { WalletSettingsStore } from "./WalletSettingsStore";
import { WalletSettingsStoreImpl } from "./WalletSettingsStore.impl";
import { DerivativesMarketStore } from "./DerivativesMarketStore";
import { DerivativesMarketStoreImpl } from "./DerivativesMarketStore.impl";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore).to(SpotMarketStoreImpl).inSingletonScope();
  bind<DerivativesMarketStore>(DerivativesMarketStore).to(DerivativesMarketStoreImpl).inSingletonScope();
  bind<WalletSettingsStore>(WalletSettingsStore).to(WalletSettingsStoreImpl).inSingletonScope();
});
