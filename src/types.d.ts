import * as events from "events";

declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.jpg" {
  const value: string;
  export = value;
}

declare module "*.jpeg" {
  const value: string;
  export = value;
}

declare module "*.gif" {
  const value: string;
  export = value;
}

declare global {
  interface EthereumProvider extends events.EventEmitter {
    isMetaMask: boolean;
    request(options: { method: string }): Promise<any>;
  }

  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};
