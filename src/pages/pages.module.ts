import { ContainerModule, interfaces } from "inversify";
import { SpotMarketAdapter, SpotMarketAdapterImpl } from "./Welcome/adapters";

export const pagesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<SpotMarketAdapter>(SpotMarketAdapter).to(SpotMarketAdapterImpl).inSingletonScope();
});
