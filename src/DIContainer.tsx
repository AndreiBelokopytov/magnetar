import { Container } from "inversify";
import { settingsModule } from "./settings";
import { storesModule } from "./stores";
import { pagesModule } from "./pages";
import React from "react";
import { interfaces } from "inversify/lib/interfaces/interfaces";

const container = new Container();
container.load(settingsModule, storesModule, pagesModule);

const Context = React.createContext(container);

type Props = {
  children: React.ReactNode;
};

export const useDependency = <T,>(identifier: interfaces.ServiceIdentifier<T>): T | undefined => {
  const context = React.useContext(Context);
  let [dependency, setDependency] = React.useState<T | undefined>(undefined);
  React.useEffect(() => {
    const _dependency = context.get<T>(identifier);
    setDependency(_dependency);
  }, [identifier]);

  return dependency;
};

export const DIContainer = ({ children }: Props) => <Context.Provider value={container}>{children}</Context.Provider>;
