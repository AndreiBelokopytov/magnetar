import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStore } from "./SpotMarketStore";
import { SpotMarketStoreImpl } from "./SpotMarketStore.impl";
import { WalletSettingsStore } from "./WalletSettingsStore";
import { WalletSettingsStoreImpl } from "./WalletSettingsStore.impl";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore).to(SpotMarketStoreImpl);
  bind<WalletSettingsStore>(WalletSettingsStore).to(WalletSettingsStoreImpl);
});
