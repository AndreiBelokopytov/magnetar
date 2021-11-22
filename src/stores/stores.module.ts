import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStoreImpl } from "./SpotMarketStore.impl";
import { AccountInfoStore } from "./AccountInfoStore";
import { AccountInfoStoreImpl } from "./AccountInfoStore.impl";
import { DerivativeMarketStore } from "./DerivativeMarketStore";
import { DerivativeMarketStoreImpl } from "./DerivativeMarketStore.impl";
import { SpotMarketStore } from "~/stores/SportMarketStore";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore).to(SpotMarketStoreImpl).inSingletonScope();
  bind<DerivativeMarketStore>(DerivativeMarketStore).to(DerivativeMarketStoreImpl).inSingletonScope();
  bind<AccountInfoStore>(AccountInfoStore).to(AccountInfoStoreImpl).inSingletonScope();
});
