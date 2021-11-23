import { AccountInfoPanel, AccountInfoPanelVM } from "~/components";
import { Fixture } from "~/components/_utils";

const model: AccountInfoPanelVM = {
  ethereumAddress: "0x797d...08ee9",
  injectiveAddress: "inj1097...hq6qd",
};

export default (
  <Fixture>
    <AccountInfoPanel model={model} />
  </Fixture>
);
