import { AccountInfoPanelVM } from "~/components";

export interface AccountInfoAdapter {
  accountInfo?: AccountInfoPanelVM;
  refresh(): Promise<void>;
}

export const AccountInfoAdapter = Symbol("AccountInfoAdapter");
