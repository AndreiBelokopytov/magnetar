import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStore } from "./SpotMarketStore";
import { SpotMarketStoreImpl } from "./SpotMarketStore.impl";
import { WalletSettingsStore } from "./WalletSettingsStore";
import { WalletSettingsStoreImpl } from "./WalletSettingsStore.impl";
import { DerivativesMarketStore } from "./DerivativesMarketStore";
import { DerivativesMarketStoreImpl } from "./DerivativesMarketStore.impl";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore).to(SpotMarketStoreImpl);
  bind<DerivativesMarketStore>(DerivativesMarketStore).to(DerivativesMarketStoreImpl);
  bind<WalletSettingsStore>(WalletSettingsStore).to(WalletSettingsStoreImpl);
});
