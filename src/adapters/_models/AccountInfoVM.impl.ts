import { AccountInfoVM } from "~/components";
import { EthAddress, Ethereum } from "~/utils";

export class AccountInfoVMImpl implements AccountInfoVM {
  get address() {
    if (Ethereum.isValidAddress(this._account)) {
      return `${this._account.slice(0, 5)}...${this._account.slice(-4)}`;
    }
    return "";
  }

  constructor(private _account: EthAddress) {}
}
