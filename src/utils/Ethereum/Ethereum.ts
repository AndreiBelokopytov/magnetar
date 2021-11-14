import { EthAddress } from "~/utils";

export abstract class Ethereum {
  static isValidAddress(address: EthAddress) {
    return address.length === 42 && address.slice(0, 2) === "0x";
  }
}
