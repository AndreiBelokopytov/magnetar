import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStoreImpl } from "./SpotMarketStore.impl";
import { AccountInfoStore } from "./AccountInfoStore";
import { AccountInfoStoreImpl } from "./AccountInfoStore.impl";
import { DerivativeMarketStore } from "./DerivativeMarketStore";
import { DerivativeMarketStoreImpl } from "./DerivativeMarketStore.impl";
import { SpotMarketStore } from "./SportMarketStore";
import { MarketHistoryStore } from "./MarketHistoryStore";
import { MarketHistoryStoreImpl } from "./MarketHistoryStore.impl";
import { SubAccountStore } from "./SubAccountStore";
import { SubAccountStoreImpl } from "./SubAccountStore.impl";
import { LocalStorageProvider, LocalStorageProviderImpl, PersistentStorageProvider } from "~/providers";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore).to(SpotMarketStoreImpl).inSingletonScope();
  bind<DerivativeMarketStore>(DerivativeMarketStore).to(DerivativeMarketStoreImpl).inSingletonScope();
  bind<AccountInfoStore>(AccountInfoStore).to(AccountInfoStoreImpl).inSingletonScope();
  bind<MarketHistoryStore>(MarketHistoryStore).to(MarketHistoryStoreImpl);
  bind<SubAccountStore>(SubAccountStore).to(SubAccountStoreImpl);
  bind<PersistentStorageProvider<any>>(LocalStorageProvider).toFactory<LocalStorageProviderImpl<any>>(() => {
    return <T>(key: string): PersistentStorageProvider<T> => {
      return new LocalStorageProviderImpl<T>(key);
    };
  });
});
