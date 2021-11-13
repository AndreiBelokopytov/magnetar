import { action, computed, makeObservable, observable, reaction } from "mobx";
import { inject, injectable } from "inversify";
import { MetaMaskAdapter } from "./MetaMaskAdapter";
import { MetaMaskOnBoardingProvider } from "./MetaMaskOnBoardingProvider";
import { Disposer, EthAccount } from "~/utils";
import { EthAccountInfoVMImpl } from "~/pages/_models";

@injectable()
export class MetaMaskAdapterImpl implements MetaMaskAdapter {
  @observable
  isConnecting = false;

  @computed
  get isWalletConnected() {
    return this._accounts.length > 0;
  }

  @computed
  get accountInfo() {
    if (this._activeAccount) {
      return new EthAccountInfoVMImpl(this._activeAccount);
    }
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
  private _accounts: EthAccount[] = [];

  constructor(@inject(MetaMaskOnBoardingProvider) private _onBoarding: MetaMaskOnBoardingProvider) {
    makeObservable(this);
  }

  @action.bound
  connect() {
    if (this.isWalletConnected) {
      return;
    }
    this.isConnecting = true;
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

    this.disposers.push(() =>
      reaction(
        () => this._accounts.length > 0,
        () => this._onWalletConnected(),
        {
          fireImmediately: true,
        }
      )
    );

    this._requestAccounts();
  }

  dispose() {
    this.disposers.forEach((d) => d());
  }

  private async _requestAccounts() {
    try {
      const accounts = await this._provider!.request({ method: "eth_requestAccounts" });
      this._updateAccounts(accounts);
    } catch (e) {
      console.log(e);
    }
  }

  @action.bound
  private _updateAccounts(accounts: EthAccount[]) {
    this._accounts = accounts;
  }

  @action.bound
  private _onWalletConnected() {
    this.isConnecting = false;
    this._onBoarding.stopOnboarding();
  }
}
