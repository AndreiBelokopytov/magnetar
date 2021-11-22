import { Disposable, EthAddress } from "~/utils";
import { WalletType } from "~/domain";

export interface WalletAdapter extends Disposable {
  connect(): void;
  init(): void;
  readonly walletType: WalletType;
  readonly activeAccount?: EthAddress;
  readonly isActive: boolean;
  readonly isConnecting: boolean;
  readonly isWalletConnected: boolean;
}

export const WalletAdapter = Symbol("WalletAdapter");
export const WalletAdapterFactory = Symbol("WalletAdapterFactory");
