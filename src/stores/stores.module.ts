import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStore } from "./SpotMarketStore";
import { WalletSettingsStore } from "./WalletSettingsStore";
import { WalletSettingsStoreImpl } from "./WalletSettingsStore.impl";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore.TYPE).to(SpotMarketStore);
  bind<WalletSettingsStore>(WalletSettingsStore).to(WalletSettingsStoreImpl);
});
