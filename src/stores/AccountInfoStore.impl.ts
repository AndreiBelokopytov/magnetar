import { inject, injectable } from "inversify";
import { AccountInfoStore } from "./AccountInfoStore";
import { makeObservable, observable } from "mobx";
import { AccountInfo, AccountInfoFields, WalletType } from "~/domain";
import { EthAddress } from "~/utils";
import { Settings } from "~/settings";
import { AuthConsumer } from "@injectivelabs/chain-consumer";
import { LocalStorageProviderFactory, LocalStorageProviderImpl, PersistentStorageProvider } from "~/providers";

@injectable()
export class AccountInfoStoreImpl implements AccountInfoStore {
  private readonly _authConsumer: AuthConsumer;

  @observable
  accountInfo?: AccountInfo;

  @observable
  private readonly _addressProvider: PersistentStorageProvider<AccountInfoFields>;

  constructor(
    @inject(Settings) private readonly _settings: Settings,
    @inject(LocalStorageProviderFactory)
    _addressProviderFactory: <AccountInfoFields>(key: string) => PersistentStorageProvider<AccountInfoFields>
  ) {
    this._authConsumer = new AuthConsumer(this._settings.appUrlEndpoint.chainHttpUrl);
    this._addressProvider = _addressProviderFactory("AccountInfo");
    makeObservable(this);
  }

  setAccountInfo(walletType: WalletType, ethereumAddress: EthAddress): void {
    this.accountInfo = new AccountInfo({
      ethereumAddress,
      injectiveAddress: this._authConsumer.getInjectiveAddress(ethereumAddress),
      walletType,
    });
    this._addressProvider.update(this.accountInfo.toJSON());
  }

  async refresh() {
    const accountValue = await this._addressProvider.fetch();

    if (accountValue) {
      const { walletType, ethereumAddress } = accountValue;

      this.setAccountInfo(walletType, ethereumAddress);
    }
  }
}
