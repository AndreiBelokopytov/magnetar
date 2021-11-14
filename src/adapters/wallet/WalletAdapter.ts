import { AccountInfoVM } from "~/components";
import { WalletType } from "~/adapters";
import { Disposable } from "~/utils";

export interface WalletAdapter extends Disposable {
  readonly type: WalletType;
  connect(): void;
  init(): void;
  accountInfo?: AccountInfoVM;
  isConnecting: boolean;
  isWalletConnected: boolean;
}

export const WalletAdapter = Symbol("WalletAdapter");
export const WalletAdapterFactory = Symbol("WalletAdapterFactory");
