export abstract class Address {
  get shortened() {
    return `${this.address.slice(0, 5)}...${this.address.slice(-4)}`;
  }

  constructor(public readonly address: string) {}
}
