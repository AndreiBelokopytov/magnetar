import { Address } from "~/domain/Address";

export class EthAddress extends Address {
  get isValid() {
    return this.address.length === 42 && this.address.slice(0, 2) === "0x";
  }
}
