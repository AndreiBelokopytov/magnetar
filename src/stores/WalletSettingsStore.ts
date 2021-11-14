import { WalletSettings, WalletType } from "~/domain";

export interface WalletSettingsStore {
  settings: WalletSettings;
  setWalletType(walletType: WalletType): void;
}

export const WalletSettingsStore = Symbol("WalletSettingsStore");
