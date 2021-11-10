import { SpotMarket } from "@injectivelabs/spot-consumer";
import { computed, makeObservable } from "mobx";
import { SpotMarketListItemVM } from "../../../components";

export class SpotMarketListItemVMImpl implements SpotMarketListItemVM {
  @computed
  get id() {
    return this._spotMarket.marketId;
  }

  @computed
  get ticker() {
    return this._spotMarket.baseToken?.name ?? "";
  }

  @computed
  get imageUrl() {
    return this._spotMarket.baseToken?.logo;
  }

  @computed
  get pair() {
    return this._spotMarket.ticker;
  }

  @computed
  get lastPrice() {
    return "0";
  }

  @computed
  get change() {
    return "0";
  }

  constructor(private _spotMarket: SpotMarket) {
    makeObservable(this);
  }
}
