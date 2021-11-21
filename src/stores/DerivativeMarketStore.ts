import { DerivativeMarket, AllChronosDerivativeMarketSummary } from "@injectivelabs/derivatives-consumer";
import { MarketStore } from "~/stores";

export type DerivativeMarketStore = MarketStore<DerivativeMarket, AllChronosDerivativeMarketSummary>;

export const DerivativeMarketStore = Symbol("DerivativeMarketStore");
