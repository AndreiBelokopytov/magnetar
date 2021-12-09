import { IndexedArray } from "~/utils";
import { SubaccountBalance } from "@injectivelabs/subaccount-consumer";

export interface SubAccountStore {
  balances: IndexedArray<SubaccountBalance>;

  fetchAllBalances(address: string): Promise<void>;
  fetchBalance(address: string, denom: string): Promise<void>;
}

export const SubAccountStore = Symbol("SubAccountStore");
