import { WalletAdapter } from "~/adapters";
import { WalletType } from "~/domain";

export interface WalletAdapterDelegate {
  readonly activeWalletType: WalletType;
  onWalletConnected(walletAdapter: WalletAdapter): void;
}

export const WalletAdapterDelegate = Symbol("WalletAdapterDelegate");
