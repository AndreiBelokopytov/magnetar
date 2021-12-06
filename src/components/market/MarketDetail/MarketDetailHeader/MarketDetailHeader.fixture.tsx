import { MarketDetailHeader } from "~/components";
import { Fixture } from "~/components/_utils";
import { marketsMock } from "~/components/_mocks";

export default (
  <Fixture>
    <MarketDetailHeader model={marketsMock[0]} />
  </Fixture>
);
