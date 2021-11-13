import { AccountInfoVM } from "~/components/AccountInfo";
import { EthAccount } from "~/utils";

export class EthAccountInfoVMImpl implements AccountInfoVM {
  get address() {
    return this._account;
  }

  constructor(private _account: EthAccount) {}
}
