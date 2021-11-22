import { AccountInfoPanelVM } from "~/components";
import { AccountInfo } from "~/domain";
import { Address } from "~/utils";

export class AccountInfoPanelVMImpl implements AccountInfoPanelVM {
  get ethereumAddress() {
    return Address.compact(this._account.ethereumAddress);
  }

  get injectiveAddress() {
    return Address.compact(this._account.injectiveAddress);
  }

  constructor(private _account: AccountInfo) {}
}
