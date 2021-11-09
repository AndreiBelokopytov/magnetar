import { injectable } from "inversify";
import { computed, makeObservable, observable } from "mobx";
import { getUrlEndpointForNetwork, Network, UrlEndpoint } from "@injectivelabs/networks";
import { Settings } from "./Settings";

@injectable()
export class _SettingsImpl implements Settings {
  @observable
  network = Network.Testnet;

  @computed
  get appUrlEndpoint(): UrlEndpoint {
    return getUrlEndpointForNetwork(this.network);
  }

  constructor() {
    makeObservable(this);
  }
}
