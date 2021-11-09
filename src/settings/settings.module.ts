import { ContainerModule, interfaces } from "inversify";
import { Settings } from "./Settings";
import { _SettingsImpl } from "./Settings.impl";

export const settingsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Settings>(Settings).to(_SettingsImpl).inSingletonScope();
});
