import { AccountInfoVM } from "~/components";
import { Disposable } from "~/utils";
import { WalletType } from "~/domain";

export interface WalletAdapter extends Disposable {
  connect(): void;
  init(): void;
  readonly accountInfo?: AccountInfoVM;
  readonly walletType: WalletType;
  readonly isActive: boolean;
  readonly isConnecting: boolean;
  readonly isWalletConnected: boolean;
}

export const WalletAdapter = Symbol("WalletAdapter");
export const WalletAdapterFactory = Symbol("WalletAdapterFactory");
