import { makeObservable, observable } from "mobx";
import { WalletType } from "./WalletType";

export class WalletSettings {
  @observable
  walletType: WalletType;

  constructor(options: WalletSettings) {
    this.walletType = options.walletType;
    makeObservable(this);
  }
}
