import { inject, injectable } from "inversify";
import { AccountInfoStore } from "./AccountInfoStore";
import { makeObservable, observable } from "mobx";
import { AccountInfo, WalletType } from "~/domain";
import { EthAddress } from "~/utils";
import { Settings } from "~/settings";
import { AuthConsumer } from "@injectivelabs/chain-consumer";
import { LocalStorageProvider, LocalStorageProviderImpl } from "~/providers";

type AccountInfoFields = {
  walletType: WalletType;
  address: string;
};

@injectable()
export class AccountInfoStoreImpl implements AccountInfoStore {
  private readonly _authConsumer: AuthConsumer;
  
  @observable
  accountInfo: AccountInfo;

  @observable
  _addressProvider: LocalStorageProviderImpl<AccountInfoFields>;

  constructor(
    @inject(Settings) private readonly _settings: Settings,
    @inject(LocalStorageProvider) _addressProviderFactory: <AccountInfoFields>(key: string) => LocalStorageProviderImpl<AccountInfoFields>
  ) {
    this._authConsumer = new AuthConsumer(this._settings.appUrlEndpoint.chainHttpUrl);
    this._addressProvider = _addressProviderFactory("AccountInfo");
    makeObservable(this);
  }

  setAccountInfo(walletType: WalletType, address: EthAddress): void {
    this._addressProvider.update({ walletType, address });
    this.accountInfo = new AccountInfo(address, this._authConsumer.getInjectiveAddress(address), walletType);
  }

  async refresh() {
    const accountValue = await this._addressProvider.fetch();

    if(accountValue) {
      const { walletType, address } = accountValue;
      
      this.setAccountInfo(walletType as WalletType, address);
    }
  }
}
