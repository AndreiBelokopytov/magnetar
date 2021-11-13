import { Disposable } from "~/utils";
import { AccountInfoVM } from "~/components/AccountInfo";

export interface MetaMaskAdapter extends Disposable {
  connect(): void;
  init(): void;
  accountInfo?: AccountInfoVM;
  isConnecting: boolean;
  isWalletConnected: boolean;
}

export const MetaMaskAdapter = Symbol("MetaMaskAdapter");
