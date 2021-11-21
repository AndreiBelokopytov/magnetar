import { MarketStore } from "~/stores/MarketStore";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";

export type SpotMarketStore = MarketStore<SpotMarket, AllChronosSpotMarketSummary>;

export const SpotMarketStore = Symbol("SpotMarketStore");
