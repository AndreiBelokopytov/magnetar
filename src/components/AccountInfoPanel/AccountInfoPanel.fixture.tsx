import { AccountInfoPanel, AccountInfoPanelVM } from "~/components";

const model: AccountInfoPanelVM = {
  ethereumAddress: "0x797d...08ee9",
  injectiveAddress: "inj1097...hq6qd",
};

export default <AccountInfoPanel model={model} />;
