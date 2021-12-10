import { inject, injectable } from "inversify";
import { AccountInfoStore } from "./AccountInfoStore";
import { makeObservable, observable } from "mobx";
import { AccountInfo, WalletType } from "~/domain";
import { EthAddress } from "~/utils";
import { Settings } from "~/settings";
import { AuthConsumer } from "@injectivelabs/chain-consumer";
import { LocalStorageProvider } from "~/providers";

@injectable()
export class AccountInfoStoreImpl implements AccountInfoStore {
  private readonly _authConsumer: AuthConsumer;

  @observable
  _addressStorage: LocalStorageProvider<string, AccountInfo>;
  
  get accountInfo() {
    return this._addressStorage.data;
  }

  constructor(@inject(Settings) private readonly _settings: Settings) {
    this._authConsumer = new AuthConsumer(this._settings.appUrlEndpoint.chainHttpUrl);
    this._addressStorage = new LocalStorageProvider<string, AccountInfo>('AccountInfo', (data) => {
      const accountInfo = data.split(':');

      return new AccountInfo(accountInfo[1], this._authConsumer.getInjectiveAddress(accountInfo[1]), accountInfo[0] as WalletType);
    });
    makeObservable(this);
  }

  setAccountInfo(walletType: WalletType, address: EthAddress): void {
    this._addressStorage.update(`${walletType}:${address}`);
  }

  async refresh() {
    return this._addressStorage.fetch();
  }
}
