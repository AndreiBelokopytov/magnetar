import { Fixture } from "~/components/_utils";
import { MarketList } from "~/components";
import { marketListMock } from "~/components/_mocks";

export default (
  <Fixture>
    <MarketList items={marketListMock} />
  </Fixture>
);
