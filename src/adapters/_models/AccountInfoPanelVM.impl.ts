import { AccountInfoPanelVM } from "~/components";
import { AccountInfo } from "~/domain";

export class AccountInfoPanelVMImpl implements AccountInfoPanelVM {
  get ethereumAddress() {
    return this._account.ethereumAddress.shortened;
  }

  get injectiveAddress() {
    return this._account.injectiveAddress.shortened;
  }

  constructor(private _account: AccountInfo) {}
}
