import { EthAddress, InjectiveAddress } from "~/utils";
import { WalletType } from "~/domain/WalletType";

export class AccountInfo {
  constructor(
    public readonly ethereumAddress: EthAddress,
    public readonly injectiveAddress: InjectiveAddress,
    public readonly walletType: WalletType
  ) {}
}
