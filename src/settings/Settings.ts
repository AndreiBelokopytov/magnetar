import { Network, UrlEndpoint } from "@injectivelabs/networks";

export interface Settings {
  network: Network;
  appUrlEndpoint: UrlEndpoint;
}

export const Settings = Symbol("Settings");
