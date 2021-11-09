import { SpotMarketAdapter } from "./SpotMarketAdapter";
import { computed, makeObservable } from "mobx";
import { injectable, inject } from "inversify";
import { SpotMarketListItemVM } from "../../../components";
import { SpotMarketStore } from "../../../stores";
import { SpotMarketListItemVMImpl } from "../models";

@injectable()
export class SpotMarketAdapterImpl implements SpotMarketAdapter {
  @computed
  get marketListItems(): SpotMarketListItemVM[] {
    return this._marketsStore.spotMarkets.map((el) => new SpotMarketListItemVMImpl(el));
  }

  constructor(@inject(SpotMarketStore.TYPE) private _marketsStore: SpotMarketStore) {
    makeObservable(this);
  }

  async refresh(): Promise<void> {
    try {
      await this._marketsStore.refresh();
    } catch (e) {
      console.log("Error loading spot markets:", e);
    }
  }
}
