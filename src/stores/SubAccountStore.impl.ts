import { SubAccountStore } from "~/stores/SubAccountStore";
import { inject, injectable } from "inversify";
import { Settings } from "~/settings";
import { makeObservable, observable } from "mobx";
import { SubaccountBalance, SubaccountConsumer, SubaccountTransformer } from "@injectivelabs/subaccount-consumer";
import { IndexedArray } from "~/utils";

@injectable()
export class SubAccountStoreImpl implements SubAccountStore {
  @observable
  balances = IndexedArray.empty<SubaccountBalance>();

  private readonly _subAccountConsumer: SubaccountConsumer;

  constructor(@inject(Settings) private _settings: Settings) {
    this._subAccountConsumer = new SubaccountConsumer(this._settings.appUrlEndpoint.exchangeUrl);
    makeObservable(this);
  }

  async fetchBalance(address: string, denom: string): Promise<void> {
    const balance = await this._subAccountConsumer.fetchSubaccountBalance(address, denom);
    if (balance) {
      this.balances.index.set(denom, SubaccountTransformer.grpcBalanceToBalance(balance));
    }
  }

  async fetchAllBalances(address: string): Promise<void> {
    const balances = await this._subAccountConsumer.fetchSubaccountBalances(address);
    balances.forEach((el) => this.balances.index.set(el.getDenom(), SubaccountTransformer.grpcBalanceToBalance(el)));
  }
}
