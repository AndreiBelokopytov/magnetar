import { AccountInfoAdapter } from "~/adapters";
import { AccountInfoStore } from "~/stores";
import { inject, injectable } from "inversify";
import { AccountInfoPanelVM } from "~/components";
import { AccountInfoPanelVMImpl } from "~/adapters/_models";

@injectable()
export class AccountInfoAdapterImpl implements AccountInfoAdapter {
  get accountInfo(): AccountInfoPanelVM | undefined {
    if (this._accountInfoStore.accountInfo) {
      return new AccountInfoPanelVMImpl(this._accountInfoStore.accountInfo);
    }
  }

  constructor(@inject(AccountInfoStore) private readonly _accountInfoStore: AccountInfoStore) {}
}
