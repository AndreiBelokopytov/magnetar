import { WalletSettingsStore } from "~/stores";
import { inject, injectable } from "inversify";
import { WalletAdapter } from "~/adapters";
import { WalletAdapterDelegate } from "./WalletAdapterDelegate";
import { computed, makeObservable } from "mobx";

@injectable()
export class WalletAdapterDelegateImpl implements WalletAdapterDelegate {
  @computed
  get activeWalletType() {
    return this._walletSettingsStore.settings.walletType;
  }

  constructor(@inject(WalletSettingsStore) private _walletSettingsStore: WalletSettingsStore) {
    makeObservable(this);
  }

  onWalletConnected(walletAdapter: WalletAdapter) {
    this._walletSettingsStore.setWalletType(walletAdapter.walletType);
  }
}
