import { WalletType } from "~/domain/WalletType";
import { EthAddress } from "~/domain/EthAddress";
import { InjectiveAddress } from "~/domain/InjectiveAddress";

export type AccountInfoFields = {
  walletType: WalletType;
  ethereumAddress: string;
  injectiveAddress: string;
};

export class AccountInfo {
  public readonly ethereumAddress: EthAddress;
  public readonly injectiveAddress: InjectiveAddress;
  public readonly walletType: WalletType;

  constructor({ ethereumAddress, injectiveAddress, walletType }: AccountInfoFields) {
    this.ethereumAddress = new EthAddress(ethereumAddress);
    this.injectiveAddress = new InjectiveAddress(injectiveAddress);
    this.walletType = walletType;
  }

  toJSON(): AccountInfoFields {
    return {
      walletType: this.walletType,
      ethereumAddress: this.ethereumAddress.address,
      injectiveAddress: this.injectiveAddress.address,
    };
  }
}
