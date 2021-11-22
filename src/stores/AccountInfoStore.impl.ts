import { inject, injectable } from "inversify";
import { AccountInfoStore } from "./AccountInfoStore";
import { makeObservable, observable } from "mobx";
import { AccountInfo, WalletType } from "~/domain";
import { EthAddress } from "~/utils";
import { Settings } from "~/settings";
import { AuthConsumer } from "@injectivelabs/chain-consumer";

@injectable()
export class AccountInfoStoreImpl implements AccountInfoStore {
  @observable
  accountInfo?: AccountInfo;

  private readonly _authConsumer: AuthConsumer;

  constructor(@inject(Settings) private readonly _settings: Settings) {
    this._authConsumer = new AuthConsumer(this._settings.appUrlEndpoint.chainHttpUrl);
    makeObservable(this);
  }

  setAccountInfo(walletType: WalletType, address: EthAddress): void {
    this.accountInfo = new AccountInfo(address, this._authConsumer.getInjectiveAddress(address), walletType);
  }
}
