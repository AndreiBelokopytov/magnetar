import { ContainerModule, interfaces } from "inversify";
import { SpotMarketStore } from "./SpotMarketStore";

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketStore>(SpotMarketStore.TYPE).to(SpotMarketStore);
});
