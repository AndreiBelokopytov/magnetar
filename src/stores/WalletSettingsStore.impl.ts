import { injectable } from "inversify";
import { WalletSettingsStore } from "./WalletSettingsStore";
import { action, makeObservable, observable } from "mobx";
import { WalletSettings, WalletType } from "~/domain";

@injectable()
export class WalletSettingsStoreImpl implements WalletSettingsStore {
  @observable
  settings = new WalletSettings({ walletType: WalletType.unknown });

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setWalletType(walletType: WalletType) {
    this.settings.walletType = walletType;
  }
}
