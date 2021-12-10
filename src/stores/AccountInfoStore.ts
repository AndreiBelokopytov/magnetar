import { AccountInfo, WalletType } from "~/domain";
import { EthAddress } from "~/utils";

export interface AccountInfoStore {
  accountInfo?: AccountInfo;
  setAccountInfo(walletType: WalletType, address: EthAddress): void;
  refresh(): Promise<void>;
}

export const AccountInfoStore = Symbol("AccountInfoStore");
