import { AccountInfoPanelVM } from "~/components";

export interface AccountInfoAdapter {
  accountInfo?: AccountInfoPanelVM;
}

export const AccountInfoAdapter = Symbol("AccountInfoAdapter");
