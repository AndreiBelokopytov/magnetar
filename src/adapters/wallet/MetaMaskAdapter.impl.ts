import { action, computed, makeObservable, observable, reaction } from "mobx";
import { inject, injectable } from "inversify";
import { MetaMaskOnBoardingProvider } from "~/api";
import { Disposer, EthAddress } from "~/utils";
import { AccountInfoVMImpl } from "~/adapters/_models";
import { WalletAdapter } from "~/adapters";
import { WalletType } from "~/domain";
import { WalletAdapterDelegate } from "./WalletAdapterDelegate";

@injectable()
export class MetaMaskAdapterImpl implements WalletAdapter {
  @observable
  isConnecting = false;

  readonly walletType: WalletType = WalletType.metaMask;

  @computed
  get isWalletConnected() {
    return this._accounts.length > 0;
  }

  @computed
  get accountInfo() {
    if (this._activeAccount) {
      return new AccountInfoVMImpl(this._activeAccount);
    }
  }

  @computed
  get isActive(): boolean {
    return this._walletAdapterDelegate.activeWalletType === this.walletType;
  }

  @computed
  private get _activeAccount() {
    return this._accounts.length > 0 ? this._accounts[0] : undefined;
  }

  private get _isMetaMaskInstalled() {
    return this._provider && this._provider.isMetaMask;
  }

  private get _provider() {
    return window.ethereum;
  }

  private disposers: Disposer[] = [];

  @observable
  private _accounts: EthAddress[] = [];

  constructor(
    @inject(MetaMaskOnBoardingProvider) private _onBoarding: MetaMaskOnBoardingProvider,
    @inject(WalletAdapterDelegate) private _walletAdapterDelegate: WalletAdapterDelegate
  ) {
    makeObservable(this);
  }

  @action.bound
  connect() {
    if (this.isWalletConnected) {
      return;
    }
    if (!this._isMetaMaskInstalled) {
      this._onBoarding.startOnboarding();
    } else {
      this._requestAccounts();
    }
  }

  async init() {
    if (!this._isMetaMaskInstalled) {
      return;
    }

    this._provider!.on("accountsChanged", this._updateAccounts);
    this.disposers.push(() => this._provider!.off("accountsChanged", this._updateAccounts));

    this.disposers.push(
      reaction(
        () => this.isWalletConnected,
        () => this._onWalletConnected(),

        {
          fireImmediately: true,
        }
      )
    );
  }

  dispose() {
    this.disposers.forEach((d) => d());
  }

  @action.bound
  private async _requestAccounts() {
    this.isConnecting = true;
    try {
      const accounts = await this._provider!.request({ method: "eth_requestAccounts" });
      this._updateAccounts(accounts);
    } catch (e) {
      console.log(e);
    }
  }

  @action.bound
  private _updateAccounts(accounts: EthAddress[]) {
    this._accounts = accounts;
  }

  @action.bound
  private _onWalletConnected() {
    this.isConnecting = false;
    this._onBoarding.stopOnboarding();
    this._walletAdapterDelegate.onWalletConnected(this);
  }
}
