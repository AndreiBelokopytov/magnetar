import { AccountInfo, WalletType } from "~/domain";

export interface AccountInfoStore {
  accountInfo?: AccountInfo;
  setAccountInfo(walletType: WalletType, address: string): void;
  refresh(): Promise<void>;
}

export const AccountInfoStore = Symbol("AccountInfoStore");
