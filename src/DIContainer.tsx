import { Container, interfaces } from "inversify";
import { settingsModule } from "~/settings";
import { storesModule } from "~/stores";
import { adapterModule } from "~/adapters";
import { apiModule } from "~/api";
import React from "react";

const container = new Container();
container.load(settingsModule, apiModule, storesModule, adapterModule);

const Context = React.createContext(container);

type Props = {
  children: React.ReactNode;
};

export const useInstanceOf = <T,>(identifier: interfaces.ServiceIdentifier<T>): T | undefined => {
  const context = React.useContext(Context);
  const dependency = React.useRef<T | undefined>(undefined);
  if (!dependency.current) {
    dependency.current = context.get<T>(identifier);
  }

  return dependency.current;
};

export const useFactory = <T, U extends unknown[], P = interfaces.SimpleFactory<T, U>>(
  identifier: interfaces.ServiceIdentifier<P>
): P | undefined => {
  const context = React.useContext(Context);
  const dependency = React.useRef<P | undefined>(undefined);
  if (!dependency.current) {
    dependency.current = context.get<P>(identifier);
  }
  return dependency.current;
};

export const DIContainer = ({ children }: Props) => <Context.Provider value={container}>{children}</Context.Provider>;
