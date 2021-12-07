import { Fixture } from "~/components/_utils";
import { MarketList } from "~/components";
import { marketsMock } from "~/components/_mocks";

export default (
  <Fixture>
    <MarketList items={marketsMock} />
  </Fixture>
);
