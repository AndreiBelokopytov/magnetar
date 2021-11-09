import { SpotMarketList } from "../../components";
import { useDependency } from "../../DIContainer";
import { SpotMarketAdapter } from "./adapters";
import React from "react";

export const WelcomePage = () => {
  const adapter = useDependency<SpotMarketAdapter>(SpotMarketAdapter);

  React.useEffect(() => {
    adapter?.refresh();
  }, [adapter]);

  return <SpotMarketList items={adapter?.marketListItems ?? []} />;
};
