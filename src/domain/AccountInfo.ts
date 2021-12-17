import { EthAddress, InjectiveAddress } from "~/utils";
import { WalletType } from "~/domain/WalletType";

export interface AccountInfoFields {
  walletType: WalletType;
  ethereumAddress: string;
}

export type AccountInfoProps = AccountInfoFields & {
  injectiveAddress: string;
};

export class AccountInfo implements AccountInfoFields {
  public readonly ethereumAddress: EthAddress;
  public readonly injectiveAddress: InjectiveAddress;
  public readonly walletType: WalletType;

  constructor({ ethereumAddress, injectiveAddress, walletType }: AccountInfoProps) {
    this.ethereumAddress = ethereumAddress;
    this.injectiveAddress = injectiveAddress;
    this.walletType = walletType;
  }

  toJSON(): AccountInfoFields {
    return {
      walletType: this.walletType,
      ethereumAddress: this.ethereumAddress,
    };
  }
}
