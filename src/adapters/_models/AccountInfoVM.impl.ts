import { AccountInfoVM } from "~/components";
import { EthAccount } from "~/utils";

export class AccountInfoVMImpl implements AccountInfoVM {
  get address() {
    return this._account;
  }

  constructor(private _account: EthAccount) {}
}
