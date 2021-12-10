import { AccountInfoStore } from "~/stores";
import { inject, injectable } from "inversify";
import { WalletAdapter } from "~/adapters";
import { WalletAdapterDelegate } from "./WalletAdapterDelegate";
import { computed, makeObservable } from "mobx";

@injectable()
export class WalletAdapterDelegateImpl implements WalletAdapterDelegate {
  @computed
  get activeWalletType() {
    return this._accountInfoStore.accountInfo?.walletType;
  }

  constructor(@inject(AccountInfoStore) private _accountInfoStore: AccountInfoStore) {
    this._accountInfoStore.refresh();
    makeObservable(this);
  }

  onWalletConnected(walletAdapter: WalletAdapter) {
    if (walletAdapter.activeAccount) {
      this._accountInfoStore.setAccountInfo(walletAdapter.walletType, walletAdapter.activeAccount);
    }
  }
}
