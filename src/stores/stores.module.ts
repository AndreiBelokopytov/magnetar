import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStoreImpl } from "./SpotMarketStore.impl";
import { WalletSettingsStore } from "./WalletSettingsStore";
import { WalletSettingsStoreImpl } from "./WalletSettingsStore.impl";
import { DerivativeMarketStore } from "./DerivativeMarketStore";
import { DerivativeMarketStoreImpl } from "./DerivativeMarketStore.impl";
import { SpotMarketStore } from "~/stores/SportMarketStore";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore).to(SpotMarketStoreImpl).inSingletonScope();
  bind<DerivativeMarketStore>(DerivativeMarketStore).to(DerivativeMarketStoreImpl).inSingletonScope();
  bind<WalletSettingsStore>(WalletSettingsStore).to(WalletSettingsStoreImpl).inSingletonScope();
});
